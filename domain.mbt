///|
/// Candidate values for one input field. The analyzer does not brute-force
/// every integer in a declared range; it examines declaration endpoints,
/// midpoints, and every boundary referenced by a predicate.
pub struct CandidateDomain {
  field : String
  values : Array[Value]
} derive(Eq, Debug)

///|
/// Settings for bounded exhaustive exploration.
pub struct ExplorationConfig {
  maximum_cases : Int
  include_midpoints : Bool
  include_neighbor_values : Bool
} derive(Eq, Debug)

///|
pub fn ExplorationConfig::standard() -> ExplorationConfig {
  {
    maximum_cases: 12000,
    include_midpoints: true,
    include_neighbor_values: true,
  }
}

///|
pub fn ExplorationConfig::compact() -> ExplorationConfig {
  {
    maximum_cases: 2000,
    include_midpoints: true,
    include_neighbor_values: true,
  }
}

///|
pub fn ExplorationConfig::fast() -> ExplorationConfig {
  {
    maximum_cases: 500,
    include_midpoints: false,
    include_neighbor_values: true,
  }
}

///|
pub fn build_candidate_domains(
  policy : Policy,
  config : ExplorationConfig,
) -> Array[CandidateDomain] {
  let result : Array[CandidateDomain] = []
  for field in policy.input_fields() {
    let references = referenced_values_for_field(policy, field.name)
    let values = candidates_for_kind(field.kind, references, config)
    result.push({ field: field.name, values })
  }
  result
}

///|
fn referenced_values_for_field(policy : Policy, name : String) -> Array[Value] {
  let result : Array[Value] = []
  for rule in policy.rules {
    for item in rule.predicates {
      if item.field == name && !contains_value(result, item.expected) {
        result.push(item.expected)
      }
    }
  }
  result
}

///|
fn candidates_for_kind(
  kind : FieldKind,
  references : Array[Value],
  config : ExplorationConfig,
) -> Array[Value] {
  match kind {
    Integer(minimum, maximum) => {
      let values : Array[Value] = []
      push_unique(values, IntValue(minimum))
      if config.include_midpoints {
        push_unique(values, IntValue(minimum + (maximum - minimum) / 2))
      }
      push_unique(values, IntValue(maximum))
      for reference in references {
        match reference {
          IntValue(number) => {
            if config.include_neighbor_values {
              push_bounded_integer(values, minimum, maximum, number - 1)
            }
            push_bounded_integer(values, minimum, maximum, number)
            if config.include_neighbor_values {
              push_bounded_integer(values, minimum, maximum, number + 1)
            }
          }
          _ => ()
        }
      }
      sort_integer_values(values)
    }
    Boolean => [BoolValue(false), BoolValue(true)]
    Enumeration(items) => items.map(fn(item) { TextValue(item) })
  }
}

///|
fn push_bounded_integer(
  values : Array[Value],
  minimum : Int,
  maximum : Int,
  candidate : Int,
) -> Unit {
  if candidate >= minimum && candidate <= maximum {
    push_unique(values, IntValue(candidate))
  }
}

///|
fn push_unique(values : Array[Value], candidate : Value) -> Unit {
  if !contains_value(values, candidate) {
    values.push(candidate)
  }
}

///|
fn contains_value(values : Array[Value], candidate : Value) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
fn integer_from_value(value : Value) -> Int {
  match value {
    IntValue(number) => number
    BoolValue(false) => 0
    BoolValue(true) => 1
    TextValue(_) => 0
  }
}

///|
fn sort_integer_values(values : Array[Value]) -> Array[Value] {
  let result = values.copy()
  if result.length() < 2 {
    return result
  }
  for upper = result.length() - 1; upper > 0; upper = upper - 1 {
    for index = 0; index < upper; index = index + 1 {
      if integer_from_value(result[index]) >
        integer_from_value(result[index + 1]) {
        let temporary = result[index]
        result[index] = result[index + 1]
        result[index + 1] = temporary
      }
    }
  }
  result
}

///|
pub fn enumerate_cases(
  domains : Array[CandidateDomain],
  maximum_cases : Int,
) -> Array[InputCase] {
  let result : Array[InputCase] = []
  if maximum_cases <= 0 {
    return result
  }
  enumerate_from(domains, 0, InputCase::empty(), result, maximum_cases)
  result
}

///|
fn enumerate_from(
  domains : Array[CandidateDomain],
  index : Int,
  current : InputCase,
  result : Array[InputCase],
  maximum_cases : Int,
) -> Unit {
  if result.length() >= maximum_cases {
    return
  }
  if index >= domains.length() {
    result.push(current)
    return
  }
  let domain = domains[index]
  for value in domain.values {
    if result.length() >= maximum_cases {
      return
    }
    enumerate_from(
      domains,
      index + 1,
      current.with_binding(domain.field, value),
      result,
      maximum_cases,
    )
  }
}

///|
pub fn candidate_case_count(domains : Array[CandidateDomain]) -> Int {
  if domains.length() == 0 {
    return 0
  }
  let mut result = 1
  for domain in domains {
    result = result * domain.values.length()
  }
  result
}

///|
pub fn find_domain(
  domains : Array[CandidateDomain],
  field : String,
) -> CandidateDomain? {
  for domain in domains {
    if domain.field == field {
      return Some(domain)
    }
  }
  None
}

///|
pub fn domain_summary(domains : Array[CandidateDomain]) -> String {
  let mut rendered = ""
  for index = 0; index < domains.length(); index = index + 1 {
    let domain = domains[index]
    if index > 0 {
      rendered = rendered + "; "
    }
    rendered = rendered + domain.field + "=" + render_value_list(domain.values)
  }
  rendered
}

///|
fn render_value_list(values : Array[Value]) -> String {
  let mut rendered = "["
  for index = 0; index < values.length(); index = index + 1 {
    if index > 0 {
      rendered = rendered + ", "
    }
    rendered = rendered + values[index].render_quoted()
  }
  rendered + "]"
}

///|
pub fn validate_case_against_policy(
  policy : Policy,
  input : InputCase,
) -> Array[String] {
  let errors : Array[String] = []
  for field in policy.input_fields() {
    match input.get(field.name) {
      None => errors.push("missing input field " + field.name)
      Some(value) =>
        if !field.kind.contains(value) {
          errors.push(
            "input " +
            field.name +
            " has value " +
            value.render_quoted() +
            " outside " +
            field.kind.render(),
          )
        }
    }
  }
  for binding in input.bindings {
    match policy.find_field(binding.field) {
      None => errors.push("unknown input field " + binding.field)
      Some(field) =>
        if field.role == OutputField {
          errors.push(
            "output field " + binding.field + " cannot be supplied as input",
          )
        }
    }
  }
  errors
}
