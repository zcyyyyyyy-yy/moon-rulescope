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
