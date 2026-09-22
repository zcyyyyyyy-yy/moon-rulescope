///|
pub enum ChangeKind {
  AddedDecision
  RemovedDecision
  ChangedDecision
  ChangedWinningRule
} derive(Eq, Debug)

///|
pub struct BehaviorChangeRecord {
  input : InputCase
  output : String
  before : Value?
  after : Value?
  before_rule : String?
  after_rule : String?
  kind : ChangeKind
} derive(Eq, Debug)

///|
pub struct BehaviorDiff {
  before_name : String
  after_name : String
  checked_cases : Int
  changes : Array[BehaviorChangeRecord]
  truncated : Bool
} derive(Eq, Debug)

///|
pub fn diff_policies(before : Policy, after : Policy) -> BehaviorDiff {
  diff_policies_with_limit(before, after, 12000, 500)
}

///|
pub fn diff_policies_with_limit(
  before : Policy,
  after : Policy,
  maximum_cases : Int,
  maximum_changes : Int,
) -> BehaviorDiff {
  let merged = merged_domains(before, after)
  let cases = enumerate_cases(merged, maximum_cases)
  let changes : Array[BehaviorChangeRecord] = []
  let mut truncated = false
  for input in cases {
    if changes.length() >= maximum_changes {
      truncated = true
      break
    }
    let left = evaluate_policy(before, input)
    let right = evaluate_policy(after, input)
    append_case_changes(left, right, changes, maximum_changes)
  }
  {
    before_name: before.name,
    after_name: after.name,
    checked_cases: cases.length(),
    changes,
    truncated,
  }
}

///|
fn merged_domains(before : Policy, after : Policy) -> Array[CandidateDomain] {
  let left = build_candidate_domains(before, ExplorationConfig::standard())
  let right = build_candidate_domains(after, ExplorationConfig::standard())
  let result = left.copy()
  for other in right {
    let mut found = false
    for index = 0; index < result.length(); index = index + 1 {
      if result[index].field == other.field {
        let combined = result[index].values.copy()
        for value in other.values {
          if !diff_contains_value(combined, value) {
            combined.push(value)
          }
        }
        result[index] = { field: other.field, values: combined }
        found = true
      }
    }
    if !found {
      result.push(other)
    }
  }
  result
}

///|
fn append_case_changes(
  before : Evaluation,
  after : Evaluation,
  changes : Array[BehaviorChangeRecord],
  maximum_changes : Int,
) -> Unit {
  let outputs : Array[String] = []
  for decision in before.decisions {
    if !diff_contains_string(outputs, decision.output) {
      outputs.push(decision.output)
    }
  }
  for decision in after.decisions {
    if !diff_contains_string(outputs, decision.output) {
      outputs.push(decision.output)
    }
  }
  for output in outputs {
    if changes.length() >= maximum_changes {
      return
    }
    let left = before.decision_for(output)
    let right = after.decision_for(output)
    match (left, right) {
      (None, None) => ()
      (None, Some(next)) =>
        changes.push({
          input: before.input,
          output,
          before: None,
          after: Some(next.value),
          before_rule: None,
          after_rule: Some(next.rule_id),
          kind: AddedDecision,
        })
      (Some(previous), None) =>
        changes.push({
          input: before.input,
          output,
          before: Some(previous.value),
          after: None,
          before_rule: Some(previous.rule_id),
          after_rule: None,
          kind: RemovedDecision,
        })
      (Some(previous), Some(next)) =>
        if previous.value != next.value {
          changes.push({
            input: before.input,
            output,
            before: Some(previous.value),
            after: Some(next.value),
            before_rule: Some(previous.rule_id),
            after_rule: Some(next.rule_id),
            kind: ChangedDecision,
          })
        } else if previous.rule_id != next.rule_id {
          changes.push({
            input: before.input,
            output,
            before: Some(previous.value),
            after: Some(next.value),
            before_rule: Some(previous.rule_id),
            after_rule: Some(next.rule_id),
            kind: ChangedWinningRule,
          })
        }
    }
  }
}

///|
fn diff_contains_value(values : Array[Value], candidate : Value) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
fn diff_contains_string(values : Array[String], candidate : String) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
pub fn BehaviorDiff::changed_case_count(self : BehaviorDiff) -> Int {
  let cases : Array[String] = []
  for change in self.changes {
    let key = change.input.render()
    if !diff_contains_string(cases, key) {
      cases.push(key)
    }
  }
  cases.length()
}

///|
pub fn BehaviorDiff::is_compatible(self : BehaviorDiff) -> Bool {
  for change in self.changes {
    match change.kind {
      RemovedDecision | ChangedDecision => return false
      AddedDecision | ChangedWinningRule => ()
    }
  }
  true
}

///|
pub fn ChangeKind::render(self : ChangeKind) -> String {
  match self {
    AddedDecision => "added-decision"
    RemovedDecision => "removed-decision"
    ChangedDecision => "changed-decision"
    ChangedWinningRule => "changed-winning-rule"
  }
}

///|
pub fn BehaviorDiff::render_text(self : BehaviorDiff) -> String {
  let mut rendered = "Behavior diff: " +
    self.before_name +
    " -> " +
    self.after_name +
    "\n"
  rendered = rendered +
    "checked=" +
    self.checked_cases.to_string() +
    " changes=" +
    self.changes.length().to_string() +
    "\n"
  for change in self.changes {
    let before_value = match change.before {
      Some(value) => value.render_quoted()
      None => "<missing>"
    }
    let after_value = match change.after {
      Some(value) => value.render_quoted()
      None => "<missing>"
    }
    rendered = rendered +
      "[" +
      change.kind.render() +
      "] " +
      change.output +
      ": " +
      before_value +
      " -> " +
      after_value +
      " for " +
      change.input.render() +
      "\n"
  }
  rendered
}
