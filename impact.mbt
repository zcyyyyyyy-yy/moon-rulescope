///|
/// Behavioral evidence for one rule when it is disabled in isolation.
pub struct RuleImpact {
  rule_id : String
  rule_name : String
  changed_cases : Int
  decision_changes : Int
  provenance_changes : Int
  affected_outputs : Array[String]
  first_counterexample : InputCase?
} derive(Eq, Debug)

///|
/// Disable one rule without mutating the caller's policy.
fn policy_without_rule(policy : Policy, rule_id : String) -> Policy {
  let rules : Array[Rule] = []
  for item in policy.rules {
    if item.id == rule_id {
      rules.push({
        id: item.id,
        name: item.name,
        priority: item.priority,
        predicates: item.predicates,
        actions: item.actions,
        source_line: item.source_line,
        tags: item.tags,
        enabled: false,
      })
    } else {
      rules.push(item)
    }
  }
  {
    name: policy.name,
    version: policy.version,
    fields: policy.fields,
    rules,
    description: policy.description,
  }
}

///|
fn impact_contains_text(values : Array[String], candidate : String) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
/// Measure how much observable behavior depends on each enabled rule.
/// A zero-impact rule is a strong deletion or shadowing candidate.
pub fn analyze_rule_impacts(policy : Policy) -> Array[RuleImpact] {
  let impacts : Array[RuleImpact] = []
  for item in policy.enabled_rules() {
    let without = policy_without_rule(policy, item.id)
    let difference = diff_policies_with_limit(policy, without, 12000, 50000)
    let outputs : Array[String] = []
    let mut decisions = 0
    let mut provenance = 0
    let mut first : InputCase? = None
    for change in difference.changes {
      if !impact_contains_text(outputs, change.output) {
        outputs.push(change.output)
      }
      match change.kind {
        ChangedWinningRule => provenance = provenance + 1
        AddedDecision | RemovedDecision | ChangedDecision =>
          decisions = decisions + 1
      }
      if first is None {
        first = Some(change.input)
      }
    }
    impacts.push({
      rule_id: item.id,
      rule_name: item.name,
      changed_cases: difference.changed_case_count(),
      decision_changes: decisions,
      provenance_changes: provenance,
      affected_outputs: outputs,
      first_counterexample: first,
    })
  }
  impacts
}

///|
pub fn RuleImpact::is_behaviorally_relevant(self : RuleImpact) -> Bool {
  self.changed_cases > 0
}

///|
pub fn RuleImpact::render_text(self : RuleImpact) -> String {
  let mut text = self.rule_id + " (" + self.rule_name + "): "
  text = text + self.changed_cases.to_string() + " changed cases"
  text = text + ", " + self.decision_changes.to_string() + " decision changes"
  text = text +
    ", " +
    self.provenance_changes.to_string() +
    " provenance changes"
  match self.first_counterexample {
    Some(input) => text + "\n  example " + input.render()
    None => text + "\n  no observable behavioral impact"
  }
}

///|
pub fn render_rule_impact_report(
  policy : Policy,
  impacts : Array[RuleImpact],
) -> String {
  let mut text = "Rule impact report: " + policy.name + "\n"
  for impact in impacts {
    text = text + impact.render_text() + "\n"
  }
  text
}
