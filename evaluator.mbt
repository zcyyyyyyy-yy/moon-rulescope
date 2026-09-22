///|
/// Internal decision candidate retained while priority resolution is running.
struct DecisionCandidate {
  output : String
  value : Value
  priority : Int
  rule_id : String
  rule_order : Int
} derive(Eq, Debug)

///|
pub fn predicate_matches(item : Predicate, input : InputCase) -> Bool {
  match input.get(item.field) {
    Some(actual) => actual.compare(item.operator, item.expected)
    None => false
  }
}

///|
pub fn evaluate_predicate(item : Predicate, input : InputCase) -> String {
  match input.get(item.field) {
    None => "field " + item.field + " is missing"
    Some(actual) => {
      let outcome = actual.compare(item.operator, item.expected)
      let label = if outcome { "matched" } else { "did not match" }
      item.field +
      " " +
      item.operator.render() +
      " " +
      item.expected.render_quoted() +
      " " +
      label +
      " (actual " +
      actual.render_quoted() +
      ")"
    }
  }
}

///|
pub fn rule_matches(item : Rule, input : InputCase) -> Bool {
  if !item.enabled {
    return false
  }
  for condition in item.predicates {
    if !predicate_matches(condition, input) {
      return false
    }
  }
  true
}

///|
pub fn evaluate_rule(item : Rule, input : InputCase) -> RuleMatch {
  let failed : Array[Predicate] = []
  if !item.enabled {
    return {
      rule_id: item.id,
      rule_name: item.name,
      matched: false,
      failed_predicates: item.predicates.copy(),
    }
  }
  for condition in item.predicates {
    if !predicate_matches(condition, input) {
      failed.push(condition)
    }
  }
  {
    rule_id: item.id,
    rule_name: item.name,
    matched: failed.length() == 0,
    failed_predicates: failed,
  }
}

///|
fn collect_candidates(
  policy : Policy,
  input : InputCase,
) -> Array[DecisionCandidate] {
  let candidates : Array[DecisionCandidate] = []
  for rule_order = 0
      rule_order < policy.rules.length()
      rule_order = rule_order + 1 {
    let item = policy.rules[rule_order]
    if rule_matches(item, input) {
      for assignment in item.actions {
        candidates.push({
          output: assignment.output,
          value: assignment.value,
          priority: item.priority,
          rule_id: item.id,
          rule_order,
        })
      }
    }
  }
  candidates
}

///|
fn find_winner(
  candidates : Array[DecisionCandidate],
  output : String,
) -> DecisionCandidate? {
  let mut winner : DecisionCandidate? = None
  for candidate in candidates {
    if candidate.output == output {
      match winner {
        None => winner = Some(candidate)
        Some(current) =>
          if candidate.priority > current.priority ||
            (
              candidate.priority == current.priority &&
              candidate.rule_order < current.rule_order
            ) {
            winner = Some(candidate)
          }
      }
    }
  }
  winner
}

///|
pub fn evaluate_policy(policy : Policy, input : InputCase) -> Evaluation {
  let matches : Array[RuleMatch] = []
  let matched_ids : Array[String] = []
  for item in policy.rules {
    let result = evaluate_rule(item, input)
    if result.matched {
      matched_ids.push(item.id)
    }
    matches.push(result)
  }
  let candidates = collect_candidates(policy, input)
  let decisions : Array[OutputDecision] = []
  for field in policy.output_fields() {
    match find_winner(candidates, field.name) {
      Some(winner) =>
        decisions.push({
          output: winner.output,
          value: winner.value,
          priority: winner.priority,
          rule_id: winner.rule_id,
        })
      None => ()
    }
  }
  { input, matches, decisions, matched_rule_ids: matched_ids }
}

///|
pub fn Evaluation::decision_for(
  self : Evaluation,
  output : String,
) -> OutputDecision? {
  for decision in self.decisions {
    if decision.output == output {
      return Some(decision)
    }
  }
  None
}

///|
pub fn Evaluation::matched(self : Evaluation, rule_id : String) -> Bool {
  for id in self.matched_rule_ids {
    if id == rule_id {
      return true
    }
  }
  false
}

///|
pub fn Evaluation::is_covered(self : Evaluation) -> Bool {
  self.decisions.length() > 0
}

///|
pub fn Evaluation::render_decisions(self : Evaluation) -> String {
  let mut rendered = "{"
  for index = 0; index < self.decisions.length(); index = index + 1 {
    if index > 0 {
      rendered = rendered + ", "
    }
    let decision = self.decisions[index]
    rendered = rendered +
      decision.output +
      ": " +
      decision.value.render_quoted()
  }
  rendered + "}"
}

///|
pub fn evaluate_cases(
  policy : Policy,
  cases : Array[InputCase],
) -> Array[Evaluation] {
  cases.map(fn(input) { evaluate_policy(policy, input) })
}

///|
pub fn matching_rules(policy : Policy, input : InputCase) -> Array[Rule] {
  policy.rules.filter(fn(item) { rule_matches(item, input) })
}

///|
pub fn winning_rule_ids(evaluation : Evaluation) -> Array[String] {
  let result : Array[String] = []
  for decision in evaluation.decisions {
    if !contains_string(result, decision.rule_id) {
      result.push(decision.rule_id)
    }
  }
  result
}

///|
fn contains_string(values : Array[String], candidate : String) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
pub fn trace_policy(policy : Policy, input : InputCase) -> Array[EvidenceStep] {
  let steps : Array[EvidenceStep] = []
  for item in policy.rules {
    let result = evaluate_rule(item, input)
    if result.matched {
      let mut assignments = ""
      for index = 0; index < item.actions.length(); index = index + 1 {
        if index > 0 {
          assignments = assignments + ", "
        }
        let assignment = item.actions[index]
        assignments = assignments +
          assignment.output +
          "=" +
          assignment.value.render_quoted()
      }
      steps.push({
        rule_id: item.id,
        title: item.name + " matched",
        detail: "priority " +
        item.priority.to_string() +
        "; emits " +
        assignments,
      })
    } else {
      let mut details = ""
      for index = 0
          index < result.failed_predicates.length()
          index = index + 1 {
        if index > 0 {
          details = details + "; "
        }
        details = details +
          evaluate_predicate(result.failed_predicates[index], input)
      }
      if !item.enabled {
        details = "rule is disabled"
      }
      steps.push({
        rule_id: item.id,
        title: item.name + " skipped",
        detail: details,
      })
    }
  }
  let final_result = evaluate_policy(policy, input)
  steps.push({
    rule_id: "RESULT",
    title: "decision resolved",
    detail: final_result.render_decisions(),
  })
  steps
}

///|
pub fn decisions_equal(left : Evaluation, right : Evaluation) -> Bool {
  if left.decisions.length() != right.decisions.length() {
    return false
  }
  for decision in left.decisions {
    match right.decision_for(decision.output) {
      None => return false
      Some(other) => if decision.value != other.value { return false }
    }
  }
  true
}
