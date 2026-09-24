///|
pub enum RegressionSource {
  IssueEvidence
  RuleImpactEvidence
} derive(Eq, Debug)

///|
/// One deterministic input/output snapshot suitable for a regression suite.
pub struct RegressionVector {
  id : String
  input : InputCase
  expected_decisions : Array[OutputDecision]
  reason : String
  source : RegressionSource
} derive(Eq, Debug)

///|
pub fn RegressionSource::render(self : RegressionSource) -> String {
  match self {
    IssueEvidence => "issue-evidence"
    RuleImpactEvidence => "rule-impact"
  }
}

///|
fn find_regression_evaluation(
  report : AnalysisReport,
  input : InputCase,
) -> Evaluation? {
  for evaluation in report.evaluations {
    if evaluation.input == input {
      return Some(evaluation)
    }
  }
  None
}

///|
fn regression_has_input(
  vectors : Array[RegressionVector],
  input : InputCase,
) -> Bool {
  for vector in vectors {
    if vector.input == input {
      return true
    }
  }
  false
}

///|
fn append_regression_vector(
  vectors : Array[RegressionVector],
  report : AnalysisReport,
  input : InputCase,
  reason : String,
  source : RegressionSource,
  maximum_vectors : Int,
) -> Unit {
  if vectors.length() >= maximum_vectors || regression_has_input(vectors, input) {
    return
  }
  let expected = match find_regression_evaluation(report, input) {
    Some(evaluation) => evaluation.decisions
    None => []
  }
  vectors.push({
    id: "RV" + (vectors.length() + 1).to_string(),
    input,
    expected_decisions: expected,
    reason,
    source,
  })
}

///|
/// Promote analyzer counterexamples and rule-impact witnesses into a compact,
/// de-duplicated regression suite. Issue evidence is prioritized.
pub fn generate_regression_vectors(
  report : AnalysisReport,
  impacts : Array[RuleImpact],
  maximum_vectors? : Int = 50,
) -> Array[RegressionVector] {
  let vectors : Array[RegressionVector] = []
  if maximum_vectors <= 0 {
    return vectors
  }
  for issue in report.issues {
    match issue.counterexample {
      Some(input) =>
        append_regression_vector(
          vectors,
          report,
          input,
          issue.code + ": " + issue.title,
          IssueEvidence,
          maximum_vectors,
        )
      None => ()
    }
  }
  for impact in impacts {
    match impact.first_counterexample {
      Some(input) =>
        append_regression_vector(
          vectors,
          report,
          input,
          impact.rule_id + ": " + impact.rule_name,
          RuleImpactEvidence,
          maximum_vectors,
        )
      None => ()
    }
  }
  vectors
}

///|
pub fn RegressionVector::render_text(self : RegressionVector) -> String {
  let mut text = self.id + " [" + self.source.render() + "] " + self.reason
  text = text + "\n  input " + self.input.render()
  if self.expected_decisions.length() == 0 {
    return text + "\n  expected <no decision>"
  }
  for decision in self.expected_decisions {
    text = text + "\n  expected " + decision.output + " = "
    text = text + decision.value.render_quoted() + " via " + decision.rule_id
  }
  text
}

///|
pub fn render_regression_suite(
  policy_name : String,
  vectors : Array[RegressionVector],
) -> String {
  let mut text = "Regression vectors: " + policy_name + "\n"
  text = text + "count=" + vectors.length().to_string() + "\n"
  for vector in vectors {
    text = text + vector.render_text() + "\n"
  }
  text
}
