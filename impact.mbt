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
pub enum ImpactBand {
  DormantImpact
  LowImpact
  MediumImpact
  HighImpact
} derive(Eq, Debug)

///|
pub struct RuleImpactSummary {
  total_rules : Int
  behaviorally_relevant_rules : Int
  dormant_rules : Int
  hottest_rule_id : String?
  hottest_changed_cases : Int
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
pub fn RuleImpact::impact_percent(self : RuleImpact, total_cases : Int) -> Int {
  if total_cases <= 0 {
    0
  } else {
    self.changed_cases * 100 / total_cases
  }
}

///|
pub fn RuleImpact::impact_band(
  self : RuleImpact,
  total_cases : Int,
) -> ImpactBand {
  let percent = self.impact_percent(total_cases)
  if self.changed_cases == 0 {
    DormantImpact
  } else if percent >= 50 {
    HighImpact
  } else if percent >= 15 {
    MediumImpact
  } else {
    LowImpact
  }
}

///|
pub fn ImpactBand::render(self : ImpactBand) -> String {
  match self {
    DormantImpact => "dormant"
    LowImpact => "low"
    MediumImpact => "medium"
    HighImpact => "high"
  }
}

///|
/// Return a deterministic highest-impact-first view without changing the
/// analyzer's declaration-order result.
pub fn rank_rule_impacts(impacts : Array[RuleImpact]) -> Array[RuleImpact] {
  let ranked = impacts.copy()
  for index = 0; index < ranked.length(); index = index + 1 {
    let mut best = index
    for candidate = index + 1
        candidate < ranked.length()
        candidate = candidate + 1 {
      if ranked[candidate].changed_cases > ranked[best].changed_cases {
        best = candidate
      }
    }
    if best != index {
      let current = ranked[index]
      ranked[index] = ranked[best]
      ranked[best] = current
    }
  }
  ranked
}

///|
pub fn summarize_rule_impacts(impacts : Array[RuleImpact]) -> RuleImpactSummary {
  let ranked = rank_rule_impacts(impacts)
  let mut relevant = 0
  let mut dormant = 0
  for impact in ranked {
    if impact.is_behaviorally_relevant() {
      relevant = relevant + 1
    } else {
      dormant = dormant + 1
    }
  }
  {
    total_rules: impacts.length(),
    behaviorally_relevant_rules: relevant,
    dormant_rules: dormant,
    hottest_rule_id: if ranked.length() > 0 {
      Some(ranked[0].rule_id)
    } else {
      None
    },
    hottest_changed_cases: if ranked.length() > 0 {
      ranked[0].changed_cases
    } else {
      0
    },
  }
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
