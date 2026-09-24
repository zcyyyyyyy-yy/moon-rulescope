///|
fn value_to_json(value : Value) -> Json {
  match value {
    IntValue(item) => Json::number(item.to_double())
    BoolValue(item) => Json::boolean(item)
    TextValue(item) => Json::string(item)
  }
}

///|
fn input_to_json(input : InputCase) -> Json {
  let fields : Map[String, Json] = Map([])
  for binding in input.bindings {
    fields[binding.field] = value_to_json(binding.value)
  }
  Json::object(fields)
}

///|
fn strings_to_json(values : Array[String]) -> Json {
  let result : Array[Json] = []
  for value in values {
    result.push(Json::string(value))
  }
  Json::array(result)
}

///|
fn evidence_to_json(steps : Array[EvidenceStep]) -> Json {
  let result : Array[Json] = []
  for step in steps {
    result.push(
      Json::object({
        "ruleId": Json::string(step.rule_id),
        "title": Json::string(step.title),
        "detail": Json::string(step.detail),
      }),
    )
  }
  Json::array(result)
}

///|
fn issue_to_json(issue : Issue) -> Json {
  let counterexample = match issue.counterexample {
    Some(input) => input_to_json(input)
    None => Json::null()
  }
  Json::object({
    "code": Json::string(issue.code),
    "severity": Json::string(issue.severity.render()),
    "kind": Json::string(issue.kind.render()),
    "title": Json::string(issue.title),
    "description": Json::string(issue.description),
    "ruleIds": strings_to_json(issue.rule_ids),
    "counterexample": counterexample,
    "evidence": evidence_to_json(issue.evidence),
    "recommendation": Json::string(issue.recommendation),
  })
}

///|
/// Stable machine-readable schema for CI artifacts and external dashboards.
pub fn AnalysisReport::to_json(self : AnalysisReport) -> Json {
  let issues : Array[Json] = []
  for issue in self.issues {
    issues.push(issue_to_json(issue))
  }
  let coverage : Array[Json] = []
  for item in self.coverage {
    coverage.push(
      Json::object({
        "ruleId": Json::string(item.rule_id),
        "matchCount": Json::number(item.match_count.to_double()),
        "winCount": Json::number(item.win_count.to_double()),
        "totalCases": Json::number(item.total_cases.to_double()),
      }),
    )
  }
  Json::object({
    "schemaVersion": Json::string("rulescope.report/v1"),
    "policy": Json::string(self.policy_name),
    "summary": Json::object({
      "candidateCases": Json::number(self.stats.candidate_cases.to_double()),
      "coveredCases": Json::number(self.stats.covered_cases.to_double()),
      "uncoveredCases": Json::number(self.stats.uncovered_cases.to_double()),
      "coveragePercent": Json::number(self.stats.coverage_percent().to_double()),
      "criticalIssues": Json::number(self.stats.conflict_count.to_double()),
      "warnings": Json::number(self.stats.warning_count.to_double()),
      "information": Json::number(self.stats.information_count.to_double()),
      "riskScore": Json::number(self.risk_score().to_double()),
    }),
    "issues": Json::array(issues),
    "ruleCoverage": Json::array(coverage),
  })
}

///|
pub fn AnalysisReport::render_json(
  self : AnalysisReport,
  pretty? : Bool = true,
) -> String {
  if pretty {
    self.to_json().stringify(indent=2)
  } else {
    self.to_json().stringify()
  }
}

///|
fn decisions_to_json(decisions : Array[OutputDecision]) -> Json {
  let result : Array[Json] = []
  for decision in decisions {
    result.push(
      Json::object({
        "output": Json::string(decision.output),
        "value": value_to_json(decision.value),
        "priority": Json::number(decision.priority.to_double()),
        "ruleId": Json::string(decision.rule_id),
      }),
    )
  }
  Json::array(result)
}

///|
fn regression_vectors_to_json(vectors : Array[RegressionVector]) -> Json {
  let result : Array[Json] = []
  for vector in vectors {
    result.push(
      Json::object({
        "id": Json::string(vector.id),
        "source": Json::string(vector.source.render()),
        "reason": Json::string(vector.reason),
        "input": input_to_json(vector.input),
        "expectedDecisions": decisions_to_json(vector.expected_decisions),
      }),
    )
  }
  Json::array(result)
}

///|
fn rule_impacts_to_json(impacts : Array[RuleImpact], total_cases : Int) -> Json {
  let result : Array[Json] = []
  for impact in rank_rule_impacts(impacts) {
    let example = match impact.first_counterexample {
      Some(input) => input_to_json(input)
      None => Json::null()
    }
    result.push(
      Json::object({
        "ruleId": Json::string(impact.rule_id),
        "ruleName": Json::string(impact.rule_name),
        "changedCases": Json::number(impact.changed_cases.to_double()),
        "impactPercent": Json::number(
          impact.impact_percent(total_cases).to_double(),
        ),
        "impactBand": Json::string(impact.impact_band(total_cases).render()),
        "decisionChanges": Json::number(impact.decision_changes.to_double()),
        "provenanceChanges": Json::number(impact.provenance_changes.to_double()),
        "affectedOutputs": strings_to_json(impact.affected_outputs),
        "firstCounterexample": example,
      }),
    )
  }
  Json::array(result)
}

///|
fn gate_violations_to_json(violations : Array[GateViolation]) -> Json {
  let result : Array[Json] = []
  for violation in violations {
    result.push(
      Json::object({
        "code": Json::string(violation.code),
        "message": Json::string(violation.message),
        "actual": Json::number(violation.actual.to_double()),
        "expected": Json::number(violation.expected.to_double()),
      }),
    )
  }
  Json::array(result)
}

///|
pub fn release_evidence_to_json(
  policy : Policy,
  gate : QualityGate,
  maximum_vectors? : Int = 50,
) -> Json {
  let report = analyze(policy)
  let impacts = analyze_rule_impacts(policy)
  let gate_result = evaluate_quality_gate(report, impacts, gate)
  let vectors = generate_regression_vectors(report, impacts, maximum_vectors~)
  let impact_summary = summarize_rule_impacts(impacts)
  let hottest_rule = match impact_summary.hottest_rule_id {
    Some(id) => Json::string(id)
    None => Json::null()
  }
  Json::object({
    "schemaVersion": Json::string("rulescope.release-evidence/v1"),
    "policy": Json::string(policy.name),
    "policyVersion": Json::string(policy.version),
    "qualityGate": Json::object({
      "name": Json::string(gate_result.gate_name),
      "passed": Json::boolean(gate_result.passed),
      "riskScore": Json::number(gate_result.risk_score.to_double()),
      "violations": gate_violations_to_json(gate_result.violations),
    }),
    "impactSummary": Json::object({
      "totalRules": Json::number(impact_summary.total_rules.to_double()),
      "relevantRules": Json::number(
        impact_summary.behaviorally_relevant_rules.to_double(),
      ),
      "dormantRules": Json::number(impact_summary.dormant_rules.to_double()),
      "hottestRuleId": hottest_rule,
      "hottestChangedCases": Json::number(
        impact_summary.hottest_changed_cases.to_double(),
      ),
    }),
    "analysis": report.to_json(),
    "ruleImpacts": rule_impacts_to_json(impacts, report.stats.candidate_cases),
    "regressionVectors": regression_vectors_to_json(vectors),
  })
}

///|
pub fn render_release_evidence(
  policy : Policy,
  gate : QualityGate,
  maximum_vectors? : Int = 50,
  pretty? : Bool = true,
) -> String {
  let evidence = release_evidence_to_json(policy, gate, maximum_vectors~)
  if pretty {
    evidence.stringify(indent=2)
  } else {
    evidence.stringify()
  }
}
