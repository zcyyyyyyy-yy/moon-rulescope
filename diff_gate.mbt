///|
/// Acceptance limits for observable behavior changes between policy versions.
pub struct BehaviorBudget {
  name : String
  maximum_breaking_changes : Int
  maximum_added_decisions : Int
  maximum_provenance_changes : Int
} derive(Eq, Debug)

///|
pub struct BehaviorGateResult {
  budget_name : String
  before_name : String
  after_name : String
  passed : Bool
  breaking_changes : Int
  added_decisions : Int
  provenance_changes : Int
  violations : Array[GateViolation]
} derive(Eq, Debug)

///|
pub fn BehaviorBudget::strict() -> BehaviorBudget {
  {
    name: "strict-diff",
    maximum_breaking_changes: 0,
    maximum_added_decisions: 0,
    maximum_provenance_changes: 0,
  }
}

///|
pub fn BehaviorBudget::backward_compatible() -> BehaviorBudget {
  {
    name: "backward-compatible",
    maximum_breaking_changes: 0,
    maximum_added_decisions: 500,
    maximum_provenance_changes: 500,
  }
}

///|
pub fn evaluate_behavior_gate(
  difference : BehaviorDiff,
  budget : BehaviorBudget,
) -> BehaviorGateResult {
  let mut breaking = 0
  let mut additions = 0
  let mut provenance = 0
  for change in difference.changes {
    match change.kind {
      RemovedDecision | ChangedDecision => breaking = breaking + 1
      AddedDecision => additions = additions + 1
      ChangedWinningRule => provenance = provenance + 1
    }
  }
  let violations : Array[GateViolation] = []
  if breaking > budget.maximum_breaking_changes {
    violations.push({
      code: "DIFF_BREAKING",
      message: "Breaking decision-change budget exceeded.",
      actual: breaking,
      expected: budget.maximum_breaking_changes,
    })
  }
  if additions > budget.maximum_added_decisions {
    violations.push({
      code: "DIFF_ADDITION",
      message: "Added-decision budget exceeded.",
      actual: additions,
      expected: budget.maximum_added_decisions,
    })
  }
  if provenance > budget.maximum_provenance_changes {
    violations.push({
      code: "DIFF_PROVENANCE",
      message: "Winning-rule provenance budget exceeded.",
      actual: provenance,
      expected: budget.maximum_provenance_changes,
    })
  }
  {
    budget_name: budget.name,
    before_name: difference.before_name,
    after_name: difference.after_name,
    passed: violations.length() == 0,
    breaking_changes: breaking,
    added_decisions: additions,
    provenance_changes: provenance,
    violations,
  }
}

///|
pub fn BehaviorGateResult::render_text(self : BehaviorGateResult) -> String {
  let status = if self.passed { "PASS" } else { "FAIL" }
  let mut text = "Behavior gate [" + self.budget_name + "]: " + status + "\n"
  text = text + self.before_name + " -> " + self.after_name + "\n"
  text = text + "breaking=" + self.breaking_changes.to_string()
  text = text + " additions=" + self.added_decisions.to_string()
  text = text + " provenance=" + self.provenance_changes.to_string() + "\n"
  for violation in self.violations {
    text = text + "[" + violation.code + "] " + violation.message
    text = text + " actual=" + violation.actual.to_string()
    text = text + " expected=" + violation.expected.to_string() + "\n"
  }
  text
}
