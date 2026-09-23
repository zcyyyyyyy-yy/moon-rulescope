///|
test "integer values render without quotes" {
  assert_eq(IntValue(42).render(), "42")
  assert_eq(IntValue(-7).render(), "-7")
}

///|
test "boolean values use DSL literals" {
  assert_eq(BoolValue(true).render(), "true")
  assert_eq(BoolValue(false).render(), "false")
}

///|
test "text values have a quoted report form" {
  assert_eq(TextValue("vip").render(), "vip")
  assert_eq(TextValue("vip").render_quoted(), "\"vip\"")
}

///|
test "integer comparisons cover every operator" {
  assert_true(IntValue(10).compare(Equal, IntValue(10)))
  assert_true(IntValue(10).compare(NotEqual, IntValue(9)))
  assert_true(IntValue(10).compare(LessThan, IntValue(11)))
  assert_true(IntValue(10).compare(LessOrEqual, IntValue(10)))
  assert_true(IntValue(10).compare(GreaterThan, IntValue(9)))
  assert_true(IntValue(10).compare(GreaterOrEqual, IntValue(10)))
}

///|
test "type mismatches never compare equal" {
  assert_false(IntValue(1).compare(Equal, TextValue("1")))
  assert_false(BoolValue(true).compare(Equal, TextValue("true")))
}

///|
test "booleans only support equality operators" {
  assert_true(BoolValue(true).compare(Equal, BoolValue(true)))
  assert_true(BoolValue(true).compare(NotEqual, BoolValue(false)))
  assert_false(BoolValue(true).compare(GreaterThan, BoolValue(false)))
}

///|
test "enumeration domains preserve declaration order" {
  let kind = Enumeration(["standard", "plus", "vip"])
  assert_eq(kind.default_candidates(), [
    TextValue("standard"),
    TextValue("plus"),
    TextValue("vip"),
  ])
}

///|
test "integer domain includes endpoints and midpoint" {
  let kind = Integer(0, 100)
  assert_eq(kind.default_candidates(), [
    IntValue(0),
    IntValue(50),
    IntValue(100),
  ])
}

///|
test "integer boundary candidates include neighbors" {
  let kind = Integer(0, 100)
  let candidates = kind.boundary_candidates([IntValue(18)])
  assert_true(candidates.contains(IntValue(17)))
  assert_true(candidates.contains(IntValue(18)))
  assert_true(candidates.contains(IntValue(19)))
}

///|
test "integer boundary candidates stay inside field range" {
  let kind = Integer(0, 10)
  let candidates = kind.boundary_candidates([IntValue(0), IntValue(10)])
  assert_false(candidates.contains(IntValue(-1)))
  assert_false(candidates.contains(IntValue(11)))
}

///|
test "field domain validates matching values" {
  assert_true(Integer(0, 10).validate(IntValue(5)) is ValidValue(_))
  assert_true(Boolean.validate(BoolValue(false)) is ValidValue(_))
  assert_true(Enumeration(["a", "b"]).validate(TextValue("b")) is ValidValue(_))
}

///|
test "field domain rejects invalid values" {
  assert_true(Integer(0, 10).validate(IntValue(20)) is InvalidValue(_))
  assert_true(Boolean.validate(TextValue("false")) is InvalidValue(_))
}

///|
test "input case stores and replaces bindings" {
  let empty = InputCase::empty()
  let first = empty.with_binding("age", IntValue(12))
  let second = first.with_binding("age", IntValue(18))
  assert_eq(second.get("age"), Some(IntValue(18)))
  assert_eq(second.bindings.length(), 1)
}

///|
test "input case reports missing bindings" {
  assert_eq(InputCase::empty().get("missing"), None)
}

///|
test "candidate domains include every checkout field" {
  let domains = build_candidate_domains(
    checkout_policy(),
    ExplorationConfig::standard(),
  )
  assert_eq(domains.length(), 5)
  assert_true(find_domain(domains, "age") is Some(_))
  assert_true(find_domain(domains, "amount") is Some(_))
}

///|
test "checkout age domain contains the legal boundary" {
  let domains = build_candidate_domains(
    checkout_policy(),
    ExplorationConfig::standard(),
  )
  let domain = find_domain(domains, "age").unwrap()
  assert_true(domain.values.contains(IntValue(17)))
  assert_true(domain.values.contains(IntValue(18)))
  assert_true(domain.values.contains(IntValue(19)))
}

///|
test "checkout amount domain contains both thresholds" {
  let domains = build_candidate_domains(
    checkout_policy(),
    ExplorationConfig::standard(),
  )
  let domain = find_domain(domains, "amount").unwrap()
  assert_true(domain.values.contains(IntValue(499)))
  assert_true(domain.values.contains(IntValue(500)))
  assert_true(domain.values.contains(IntValue(999)))
  assert_true(domain.values.contains(IntValue(1000)))
}

///|
test "cartesian enumeration produces deterministic binding order" {
  let domains : Array[CandidateDomain] = [
    { field: "enabled", values: [BoolValue(false), BoolValue(true)] },
    { field: "tier", values: [TextValue("a"), TextValue("b")] },
  ]
  let cases = enumerate_cases(domains, 100)
  assert_eq(cases.length(), 4)
  assert_eq(cases[0].get("enabled"), Some(BoolValue(false)))
  assert_eq(cases[0].get("tier"), Some(TextValue("a")))
  assert_eq(cases[3].get("enabled"), Some(BoolValue(true)))
  assert_eq(cases[3].get("tier"), Some(TextValue("b")))
}

///|
test "enumeration respects maximum case budget" {
  let domains : Array[CandidateDomain] = [
    { field: "a", values: [IntValue(1), IntValue(2), IntValue(3)] },
    { field: "b", values: [IntValue(1), IntValue(2), IntValue(3)] },
  ]
  assert_eq(enumerate_cases(domains, 4).length(), 4)
}

///|
test "case validation detects missing fields" {
  let errors = validate_case_against_policy(
    clean_age_policy(),
    InputCase::empty(),
  )
  assert_true(errors.length() > 0)
}

///|
test "case validation accepts complete input" {
  let input = InputCase::empty().with_binding("age", IntValue(24))
  let errors = validate_case_against_policy(clean_age_policy(), input)
  assert_eq(errors.length(), 0)
}

///|
test "predicate evaluator reads input bindings" {
  let input = InputCase::empty().with_binding("age", IntValue(17))
  let condition = predicate("age", LessThan, IntValue(18), 1)
  assert_true(predicate_matches(condition, input))
}

///|
test "rule evaluator requires every predicate" {
  let input = InputCase::empty()
    .with_binding("age", IntValue(17))
    .with_binding("amount", IntValue(500))
  let item = checkout_policy().rules[0]
  assert_false(rule_matches(item, input))
}

///|
test "clean policy denies minors" {
  let input = InputCase::empty().with_binding("age", IntValue(12))
  let result = evaluate_policy(clean_age_policy(), input)
  let decision = result.decision_for("access").unwrap()
  assert_eq(decision.value, TextValue("deny"))
  assert_eq(decision.rule_id, "A001")
}

///|
test "clean policy allows adults" {
  let input = InputCase::empty().with_binding("age", IntValue(18))
  let result = evaluate_policy(clean_age_policy(), input)
  let decision = result.decision_for("access").unwrap()
  assert_eq(decision.value, TextValue("allow"))
  assert_eq(decision.rule_id, "A002")
}

///|
test "higher priority decision wins" {
  let input = InputCase::empty()
    .with_binding("age", IntValue(30))
    .with_binding("tier", TextValue("vip"))
    .with_binding("region", TextValue("eu"))
    .with_binding("amount", IntValue(600))
    .with_binding("digital", BoolValue(true))
  let result = evaluate_policy(checkout_policy(), input)
  let decision = result.decision_for("decision").unwrap()
  assert_eq(decision.value, TextValue("allow"))
  assert_eq(decision.rule_id, "R002")
}

///|
test "independent outputs are resolved independently" {
  let input = InputCase::empty()
    .with_binding("age", IntValue(30))
    .with_binding("tier", TextValue("vip"))
    .with_binding("region", TextValue("cn"))
    .with_binding("amount", IntValue(1200))
    .with_binding("digital", BoolValue(false))
  let result = evaluate_policy(checkout_policy(), input)
  assert_eq(result.decision_for("decision").unwrap().value, TextValue("allow"))
  assert_eq(result.decision_for("discount").unwrap().value, IntValue(20))
}

///|
test "evaluation trace includes final resolution" {
  let input = InputCase::empty().with_binding("age", IntValue(12))
  let steps = trace_policy(clean_age_policy(), input)
  assert_eq(steps.length(), 3)
  assert_eq(steps[steps.length() - 1].rule_id, "RESULT")
}

///|
test "clean policy has no conflict" {
  let report = analyze(clean_age_policy())
  assert_eq(report.critical_issues().length(), 0)
}

///|
test "clean policy covers every generated case" {
  let report = analyze(clean_age_policy())
  assert_eq(report.stats.coverage_percent(), 100)
  assert_eq(report.stats.uncovered_cases, 0)
}

///|
test "conflicting policy produces RS1001" {
  let report = analyze(conflicting_age_policy())
  assert_true(report.find_issue("RS1001") is Some(_))
  assert_true(report.stats.conflict_count > 0)
}

///|
test "conflict report contains reproducible counterexample" {
  let report = analyze(conflicting_age_policy())
  let issue = report.find_issue("RS1001").unwrap()
  assert_true(issue.counterexample is Some(_))
  let input = issue.counterexample.unwrap()
  assert_true(input.get("age") is Some(_))
  assert_eq(input.get("member"), Some(BoolValue(true)))
}

///|
test "shadowed policy produces RS2002" {
  let report = analyze(shadowed_policy())
  assert_true(report.find_issue("RS2002") is Some(_))
}

///|
test "unreachable policy produces RS2001" {
  let report = analyze(unreachable_policy())
  assert_true(report.find_issue("RS2001") is Some(_))
}

///|
test "duplicate policy produces RS5002" {
  let report = analyze(duplicate_policy())
  assert_true(report.find_issue("RS5002") is Some(_))
}

///|
test "repeated predicate produces RS5001" {
  let report = analyze(redundant_predicate_policy())
  assert_true(report.find_issue("RS5001") is Some(_))
}

///|
test "checkout policy has the intended conflict" {
  let report = analyze(checkout_policy())
  assert_true(report.find_issue("RS1001") is Some(_))
}

///|
test "content policy exposes premium minor conflict" {
  let report = analyze(content_policy())
  assert_true(report.find_issue("RS1001") is Some(_))
}

///|
test "expense policy exposes receipt director conflict" {
  let report = analyze(expense_policy())
  assert_true(report.find_issue("RS1001") is Some(_))
}

///|
test "insurance policy produces two-output evaluations" {
  let input = InputCase::empty()
    .with_binding("age", IntValue(30))
    .with_binding("claim", IntValue(1000))
    .with_binding("history", TextValue("clear"))
    .with_binding("documents", BoolValue(true))
  let evaluation = evaluate_policy(insurance_policy(), input)
  assert_true(evaluation.decision_for("decision") is Some(_))
  assert_true(evaluation.decision_for("risk") is Some(_))
}

///|
test "policy diff detects revised young-user behavior" {
  let difference = diff_policies(clean_age_policy(), age_policy_v2())
  assert_true(difference.changes.length() > 0)
  assert_true(difference.changed_case_count() > 0)
}

///|
test "policy diff reports same policy as compatible" {
  let original = clean_age_policy()
  let difference = diff_policies(original, original)
  assert_eq(difference.changes.length(), 0)
  assert_true(difference.is_compatible())
}

///|
test "policy diff classifies decision changes" {
  let difference = diff_policies(clean_age_policy(), age_policy_v2())
  let mut found = false
  for change in difference.changes {
    if change.kind == ChangedDecision {
      found = true
    }
  }
  assert_true(found)
}

///|
test "text report includes issue code and policy name" {
  let report = analyze(conflicting_age_policy())
  let text = report.render_text()
  assert_true(text.contains("Conflicting age gate"))
  assert_true(text.contains("RS1001"))
}

///|
test "behavior diff text includes direction" {
  let difference = diff_policies(clean_age_policy(), age_policy_v2())
  let text = difference.render_text()
  assert_true(text.contains("Clean age gate"))
  assert_true(text.contains("Clean age gate v2"))
}

///|
test "rule impact finds behavior owned by both age rules" {
  let impacts = analyze_rule_impacts(clean_age_policy())
  assert_eq(impacts.length(), 2)
  assert_true(impacts[0].is_behaviorally_relevant())
  assert_true(impacts[1].is_behaviorally_relevant())
  assert_true(impacts[0].first_counterexample is Some(_))
}

///|
test "rule impact identifies unreachable rule as zero impact" {
  let impacts = analyze_rule_impacts(unreachable_policy())
  let mut found = false
  for impact in impacts {
    if impact.rule_id == "U001" {
      found = true
      assert_eq(impact.changed_cases, 0)
      assert_true(!impact.is_behaviorally_relevant())
    }
  }
  assert_true(found)
}

///|
test "rule impact report includes counterexample evidence" {
  let policy = clean_age_policy()
  let text = render_rule_impact_report(policy, analyze_rule_impacts(policy))
  assert_true(text.contains("Rule impact report"))
  assert_true(text.contains("A001"))
  assert_true(text.contains("example"))
}
