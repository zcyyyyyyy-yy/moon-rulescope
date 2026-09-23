///|
/// A reproducible acceptance policy for rule-set releases.
pub struct QualityGate {
  name : String
  maximum_critical_issues : Int
  maximum_warnings : Int
  minimum_coverage_percent : Int
  require_every_rule_to_have_impact : Bool
} derive(Eq, Debug)

///|
pub struct GateViolation {
  code : String
  message : String
  actual : Int
  expected : Int
} derive(Eq, Debug)

///|
pub struct GateResult {
  gate_name : String
  policy_name : String
  passed : Bool
  risk_score : Int
  violations : Array[GateViolation]
} derive(Eq, Debug)

///|
pub fn QualityGate::strict() -> QualityGate {
  {
    name: "strict",
    maximum_critical_issues: 0,
    maximum_warnings: 0,
    minimum_coverage_percent: 100,
    require_every_rule_to_have_impact: true,
  }
}

///|
pub fn QualityGate::balanced() -> QualityGate {
  {
    name: "balanced",
    maximum_critical_issues: 0,
    maximum_warnings: 3,
    minimum_coverage_percent: 90,
    require_every_rule_to_have_impact: true,
  }
}

///|
/// A bounded 0-100 risk indicator for dashboards and release summaries.
pub fn AnalysisReport::risk_score(self : AnalysisReport) -> Int {
  let uncovered_percent = if self.stats.candidate_cases == 0 {
    100
  } else {
    self.stats.uncovered_cases * 100 / self.stats.candidate_cases
  }
  let mut score = self.stats.conflict_count * 35
  score = score + self.stats.warning_count * 10
  score = score + self.stats.information_count * 2
  score = score + uncovered_percent / 2
  if score > 100 {
    100
  } else {
    score
  }
}

///|
pub fn evaluate_quality_gate(
  report : AnalysisReport,
  impacts : Array[RuleImpact],
  gate : QualityGate,
) -> GateResult {
  let violations : Array[GateViolation] = []
  if report.stats.conflict_count > gate.maximum_critical_issues {
    violations.push({
      code: "GATE_CRITICAL",
      message: "Critical issue budget exceeded.",
      actual: report.stats.conflict_count,
      expected: gate.maximum_critical_issues,
    })
  }
  if report.stats.warning_count > gate.maximum_warnings {
    violations.push({
      code: "GATE_WARNING",
      message: "Warning budget exceeded.",
      actual: report.stats.warning_count,
      expected: gate.maximum_warnings,
    })
  }
  let coverage = report.stats.coverage_percent()
  if coverage < gate.minimum_coverage_percent {
    violations.push({
      code: "GATE_COVERAGE",
      message: "Candidate-path coverage is below the required threshold.",
      actual: coverage,
      expected: gate.minimum_coverage_percent,
    })
  }
  if gate.require_every_rule_to_have_impact {
    let mut zero_impact_rules = 0
    for impact in impacts {
      if !impact.is_behaviorally_relevant() {
        zero_impact_rules = zero_impact_rules + 1
      }
    }
    if zero_impact_rules > 0 {
      violations.push({
        code: "GATE_ZERO_IMPACT",
        message: "One or more enabled rules have no observable behavior.",
        actual: zero_impact_rules,
        expected: 0,
      })
    }
  }
  {
    gate_name: gate.name,
    policy_name: report.policy_name,
    passed: violations.length() == 0,
    risk_score: report.risk_score(),
    violations,
  }
}

///|
pub fn GateResult::render_text(self : GateResult) -> String {
  let status = if self.passed { "PASS" } else { "FAIL" }
  let mut text = "Quality gate [" + self.gate_name + "]: " + status + "\n"
  text = text + "policy=" + self.policy_name
  text = text + " risk=" + self.risk_score.to_string() + "/100\n"
  for violation in self.violations {
    text = text + "[" + violation.code + "] " + violation.message
    text = text + " actual=" + violation.actual.to_string()
    text = text + " expected=" + violation.expected.to_string() + "\n"
  }
  text
}
