///|
/// A normalized scalar value used by fields, predicates, actions, examples,
/// traces, and counterexamples. Keeping the core value algebra deliberately
/// small makes every analysis result deterministic across backends.
pub enum Value {
  IntValue(Int)
  BoolValue(Bool)
  TextValue(String)
} derive(Eq, Debug)

///|
/// The three field families accepted by the first stable RuleScope DSL.
/// Integer ranges are closed intervals. Enumerations preserve declaration
/// order so reports and generated tests remain stable.
pub enum FieldKind {
  Integer(Int, Int)
  Boolean
  Enumeration(Array[String])
} derive(Eq, Debug)

///|
/// Comparison operators supported by atomic predicates.
pub enum CompareOp {
  Equal
  NotEqual
  LessThan
  LessOrEqual
  GreaterThan
  GreaterOrEqual
} derive(Eq, Debug)

///|
/// Whether a field is supplied by the caller or written by a rule.
pub enum FieldRole {
  InputField
  OutputField
} derive(Eq, Debug)

///|
/// The result of attempting to coerce a value into a field definition.
pub enum ValidationResult {
  ValidValue(Value)
  InvalidValue(String)
} derive(Eq, Debug)

///|
pub fn Value::render(self : Value) -> String {
  match self {
    IntValue(value) => value.to_string()
    BoolValue(true) => "true"
    BoolValue(false) => "false"
    TextValue(value) => value
  }
}

///|
pub fn Value::render_quoted(self : Value) -> String {
  match self {
    TextValue(value) => "\"\{value}\""
    other => other.render()
  }
}

///|
pub fn Value::kind_name(self : Value) -> String {
  match self {
    IntValue(_) => "integer"
    BoolValue(_) => "boolean"
    TextValue(_) => "text"
  }
}

///|
pub fn Value::as_int(self : Value) -> Int? {
  match self {
    IntValue(value) => Some(value)
    _ => None
  }
}

///|
pub fn Value::as_bool(self : Value) -> Bool? {
  match self {
    BoolValue(value) => Some(value)
    _ => None
  }
}

///|
pub fn Value::as_text(self : Value) -> String? {
  match self {
    TextValue(value) => Some(value)
    _ => None
  }
}

///|
pub fn Value::compare(
  self : Value,
  operator : CompareOp,
  expected : Value,
) -> Bool {
  match (self, expected) {
    (IntValue(actual), IntValue(target)) =>
      compare_int(actual, operator, target)
    (BoolValue(actual), BoolValue(target)) =>
      compare_bool(actual, operator, target)
    (TextValue(actual), TextValue(target)) =>
      compare_text(actual, operator, target)
    _ => false
  }
}

///|
fn compare_int(actual : Int, operator : CompareOp, expected : Int) -> Bool {
  match operator {
    Equal => actual == expected
    NotEqual => actual != expected
    LessThan => actual < expected
    LessOrEqual => actual <= expected
    GreaterThan => actual > expected
    GreaterOrEqual => actual >= expected
  }
}

///|
fn compare_bool(actual : Bool, operator : CompareOp, expected : Bool) -> Bool {
  match operator {
    Equal => actual == expected
    NotEqual => actual != expected
    _ => false
  }
}

///|
fn compare_text(
  actual : String,
  operator : CompareOp,
  expected : String,
) -> Bool {
  match operator {
    Equal => actual == expected
    NotEqual => actual != expected
    _ => false
  }
}

///|
pub fn CompareOp::render(self : CompareOp) -> String {
  match self {
    Equal => "="
    NotEqual => "!="
    LessThan => "<"
    LessOrEqual => "<="
    GreaterThan => ">"
    GreaterOrEqual => ">="
  }
}

///|
pub fn CompareOp::negate(self : CompareOp) -> CompareOp {
  match self {
    Equal => NotEqual
    NotEqual => Equal
    LessThan => GreaterOrEqual
    LessOrEqual => GreaterThan
    GreaterThan => LessOrEqual
    GreaterOrEqual => LessThan
  }
}

///|
pub fn CompareOp::is_ordering(self : CompareOp) -> Bool {
  match self {
    LessThan | LessOrEqual | GreaterThan | GreaterOrEqual => true
    _ => false
  }
}

///|
pub fn FieldKind::name(self : FieldKind) -> String {
  match self {
    Integer(_, _) => "int"
    Boolean => "bool"
    Enumeration(_) => "enum"
  }
}

///|
pub fn FieldKind::render(self : FieldKind) -> String {
  match self {
    Integer(minimum, maximum) => "int \{minimum}..\{maximum}"
    Boolean => "bool"
    Enumeration(values) => {
      let mut rendered = "enum ["
      for index = 0; index < values.length(); index = index + 1 {
        if index > 0 {
          rendered = rendered + ", "
        }
        rendered = rendered + values[index]
      }
      rendered + "]"
    }
  }
}

///|
pub fn FieldKind::contains(self : FieldKind, value : Value) -> Bool {
  match (self, value) {
    (Integer(minimum, maximum), IntValue(candidate)) =>
      candidate >= minimum && candidate <= maximum
    (Boolean, BoolValue(_)) => true
    (Enumeration(values), TextValue(candidate)) =>
      string_array_contains(values, candidate)
    _ => false
  }
}

///|
pub fn FieldKind::validate(self : FieldKind, value : Value) -> ValidationResult {
  if self.contains(value) {
    ValidValue(value)
  } else {
    InvalidValue(
      "value \{value.render_quoted()} is outside declared domain \{self.render()}",
    )
  }
}

///|
pub fn FieldKind::minimum_value(self : FieldKind) -> Value {
  match self {
    Integer(minimum, _) => IntValue(minimum)
    Boolean => BoolValue(false)
    Enumeration(values) =>
      if values.length() == 0 {
        TextValue("")
      } else {
        TextValue(values[0])
      }
  }
}

///|
pub fn FieldKind::maximum_value(self : FieldKind) -> Value {
  match self {
    Integer(_, maximum) => IntValue(maximum)
    Boolean => BoolValue(true)
    Enumeration(values) =>
      if values.length() == 0 {
        TextValue("")
      } else {
        TextValue(values[values.length() - 1])
      }
  }
}

///|
pub fn FieldKind::default_candidates(self : FieldKind) -> Array[Value] {
  match self {
    Integer(minimum, maximum) => {
      let midpoint = minimum + (maximum - minimum) / 2
      let values : Array[Value] = []
      values.push(IntValue(minimum))
      push_unique_value(values, IntValue(midpoint))
      push_unique_value(values, IntValue(maximum))
      values
    }
    Boolean => [BoolValue(false), BoolValue(true)]
    Enumeration(items) => items.map(fn(item) { TextValue(item) })
  }
}

///|
pub fn FieldKind::boundary_candidates(
  self : FieldKind,
  referenced : Array[Value],
) -> Array[Value] {
  let result = self.default_candidates()
  match self {
    Integer(minimum, maximum) =>
      for value in referenced {
        match value {
          IntValue(number) => {
            push_int_candidate(result, minimum, maximum, number - 1)
            push_int_candidate(result, minimum, maximum, number)
            push_int_candidate(result, minimum, maximum, number + 1)
          }
          _ => ()
        }
      }
    Boolean | Enumeration(_) => ()
  }
  sort_values(result)
}

///|
fn push_int_candidate(
  values : Array[Value],
  minimum : Int,
  maximum : Int,
  candidate : Int,
) -> Unit {
  if candidate >= minimum && candidate <= maximum {
    push_unique_value(values, IntValue(candidate))
  }
}

///|
fn push_unique_value(values : Array[Value], candidate : Value) -> Unit {
  if !value_array_contains(values, candidate) {
    values.push(candidate)
  }
}

///|
fn value_array_contains(values : Array[Value], candidate : Value) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
fn string_array_contains(values : Array[String], candidate : String) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
fn value_rank(value : Value) -> Int {
  match value {
    IntValue(number) => number
    BoolValue(false) => 0
    BoolValue(true) => 1
    TextValue(_) => 0
  }
}

///|
fn sort_values(values : Array[Value]) -> Array[Value] {
  let result = values.copy()
  for end = result.length() - 1; end > 0; end = end - 1 {
    for index = 0; index < end; index = index + 1 {
      if value_rank(result[index]) > value_rank(result[index + 1]) {
        let temporary = result[index]
        result[index] = result[index + 1]
        result[index + 1] = temporary
      }
    }
  }
  result
}
