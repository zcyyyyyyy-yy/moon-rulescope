///|
/// Analyze a policy with the standard bounded-exhaustive configuration.
pub fn analyze(policy : Policy) -> AnalysisReport {
  analyze_with_config(policy, ExplorationConfig::standard())
}

///|
/// Analyze a policy with an explicit exploration budget.
pub fn analyze_with_config(
  policy : Policy,
  config : ExplorationConfig,
) -> AnalysisReport {
  let declaration_issues = validate_policy(policy)
  let domains = build_candidate_domains(policy, config)
  let cases = enumerate_cases(domains, config.maximum_cases)
  let evaluations = evaluate_cases(policy, cases)
  let issues = declaration_issues.copy()
  append_all_issues(issues, find_duplicate_rules(policy))
  append_all_issues(issues, find_redundant_predicates(policy))
  append_all_issues(issues, find_conflicts(policy, evaluations))
  let coverage = calculate_coverage(policy, evaluations)
  append_all_issues(
    issues,
    find_unreachable_and_shadowed(policy, coverage, evaluations),
  )
  append_all_issues(issues, find_coverage_gaps(policy, evaluations))
  let stats = calculate_stats(issues, evaluations)
  { policy_name: policy.name, issues, coverage, evaluations, stats }
}

///|
fn append_all_issues(target : Array[Issue], source : Array[Issue]) -> Unit {
  for issue in source {
    target.push(issue)
  }
}

///|
pub fn validate_policy(policy : Policy) -> Array[Issue] {
  let issues : Array[Issue] = []
  if policy.name == "" {
    issues.push(
      invalid_issue(
        "RS4001",
        "Policy name is empty",
        "A stable policy name is required in reports and behavioral diffs.",
        [],
        "Add a non-empty policy name.",
      ),
    )
  }
  if policy.input_fields().length() == 0 {
    issues.push(
      invalid_issue(
        "RS4002",
        "Policy has no input fields",
        "No candidate domain can be generated without at least one input field.",
        [],
        "Declare one or more input fields.",
      ),
    )
  }
  if policy.output_fields().length() == 0 {
    issues.push(
      invalid_issue(
        "RS4003",
        "Policy has no output fields",
        "Rules cannot communicate a decision without an output field.",
        [],
        "Declare one or more output fields.",
      ),
    )
  }
  if policy.rules.length() == 0 {
    issues.push(
      invalid_issue(
        "RS4004",
        "Policy has no rules",
        "The policy cannot cover any input because it contains no rules.",
        [],
        "Add at least one rule.",
      ),
    )
  }
  append_all_issues(issues, validate_fields(policy))
  append_all_issues(issues, validate_rules(policy))
  issues
}

///|
fn validate_fields(policy : Policy) -> Array[Issue] {
  let issues : Array[Issue] = []
  for left_index = 0
      left_index < policy.fields.length()
      left_index = left_index + 1 {
    let left = policy.fields[left_index]
    if left.name == "" {
      issues.push(
        invalid_issue(
          "RS4010",
          "Field name is empty",
          "A field declared on line " +
          left.source_line.to_string() +
          " has no name.",
          [],
          "Give the field a stable identifier.",
        ),
      )
    }
    match left.kind {
      Integer(minimum, maximum) =>
        if minimum > maximum {
          issues.push(
            invalid_issue(
              "RS4011",
              "Integer field has an inverted range",
              left.name +
              " declares " +
              minimum.to_string() +
              ".." +
              maximum.to_string(),
              [],
              "Swap the bounds or correct the intended numeric range.",
            ),
          )
        }
      Enumeration(values) => {
        if values.length() == 0 {
          issues.push(
            invalid_issue(
              "RS4012",
              "Enumeration field has no values",
              left.name + " cannot produce or accept any value.",
              [],
              "Add at least one enumeration value.",
            ),
          )
        }
        for value_index = 0
            value_index < values.length()
            value_index = value_index + 1 {
          for other_index = value_index + 1
              other_index < values.length()
              other_index = other_index + 1 {
            if values[value_index] == values[other_index] {
              issues.push(
                invalid_issue(
                  "RS4013",
                  "Enumeration contains a duplicate value",
                  left.name + " repeats " + values[value_index] + ".",
                  [],
                  "Remove the duplicate enumeration value.",
                ),
              )
            }
          }
        }
      }
      Boolean => ()
    }
    for right_index = left_index + 1
        right_index < policy.fields.length()
        right_index = right_index + 1 {
      let right = policy.fields[right_index]
      if left.name == right.name {
        issues.push(
          invalid_issue(
            "RS4014",
            "Field is declared more than once",
            left.name + " appears at least twice in the policy schema.",
            [],
            "Keep one authoritative declaration for the field.",
          ),
        )
      }
    }
  }
  issues
}

///|
fn validate_rules(policy : Policy) -> Array[Issue] {
  let issues : Array[Issue] = []
  for left_index = 0
      left_index < policy.rules.length()
      left_index = left_index + 1 {
    let item = policy.rules[left_index]
    if item.id == "" {
      issues.push(
        invalid_issue(
          "RS4020",
          "Rule identifier is empty",
          "Rule " + item.name + " needs a stable identifier for evidence links.",
          [item.id],
          "Assign a unique rule identifier.",
        ),
      )
    }
    if item.predicates.length() == 0 {
      issues.push(
        invalid_issue(
          "RS4021",
          "Rule has no predicates",
          item.name + " matches the entire input domain.",
          [item.id],
          "Add an explicit condition or document the rule as a default.",
        ),
      )
    }
    if item.actions.length() == 0 {
      issues.push(
        invalid_issue(
          "RS4022",
          "Rule has no actions",
          item.name + " can match but cannot affect any output.",
          [item.id],
          "Add an output assignment or remove the rule.",
        ),
      )
    }
    for other_index = left_index + 1
        other_index < policy.rules.length()
        other_index = other_index + 1 {
      if item.id == policy.rules[other_index].id {
        issues.push(
          invalid_issue(
            "RS4023",
            "Rule identifier is duplicated",
            item.id + " is used by multiple rules.",
            [item.id],
            "Give every rule a unique identifier.",
          ),
        )
      }
    }
    append_all_issues(issues, validate_rule_references(policy, item))
  }
  issues
}

///|
fn validate_rule_references(policy : Policy, item : Rule) -> Array[Issue] {
  let issues : Array[Issue] = []
  for condition in item.predicates {
    match policy.find_field(condition.field) {
      None =>
        issues.push(
          invalid_issue(
            "RS4030",
            "Predicate references an unknown field",
            item.id + " reads " + condition.field + ", which is not declared.",
            [item.id],
            "Declare the field or correct the predicate spelling.",
          ),
        )
      Some(field) => {
        if field.role != InputField {
          issues.push(
            invalid_issue(
              "RS4031",
              "Predicate reads an output field",
              item.id + " reads output " + condition.field + " as input.",
              [item.id],
              "Move the value to the input schema or rewrite the condition.",
            ),
          )
        }
        if !field.kind.contains(condition.expected) {
          issues.push(
            invalid_issue(
              "RS4032",
              "Predicate value is outside the field domain",
              condition.expected.render_quoted() +
              " is invalid for " +
              condition.field +
              ".",
              [item.id],
              "Use a value declared by the field domain.",
            ),
          )
        }
        if condition.operator.is_ordering() && field.kind.name() != "int" {
          issues.push(
            invalid_issue(
              "RS4033",
              "Ordering operator is applied to a non-integer field",
              item.id +
              " compares " +
              condition.field +
              " with " +
              condition.operator.render() +
              ".",
              [item.id],
              "Use = or != for boolean and enumeration fields.",
            ),
          )
        }
      }
    }
  }
  for assignment in item.actions {
    match policy.find_field(assignment.output) {
      None =>
        issues.push(
          invalid_issue(
            "RS4040",
            "Action writes an unknown output",
            item.id +
            " writes " +
            assignment.output +
            ", which is not declared.",
            [item.id],
            "Declare the output or correct the action spelling.",
          ),
        )
      Some(field) => {
        if field.role != OutputField {
          issues.push(
            invalid_issue(
              "RS4041",
              "Action writes an input field",
              item.id + " attempts to assign input " + assignment.output + ".",
              [item.id],
              "Declare a corresponding output field.",
            ),
          )
        }
        if !field.kind.contains(assignment.value) {
          issues.push(
            invalid_issue(
              "RS4042",
              "Action value is outside the output domain",
              assignment.value.render_quoted() +
              " is invalid for " +
              assignment.output +
              ".",
              [item.id],
              "Use a value declared by the output field.",
            ),
          )
        }
      }
    }
  }
  issues
}

///|
fn invalid_issue(
  code : String,
  title : String,
  description : String,
  rule_ids : Array[String],
  recommendation : String,
) -> Issue {
  {
    code,
    severity: Warning,
    kind: InvalidDeclaration,
    title,
    description,
    rule_ids,
    counterexample: None,
    evidence: [],
    recommendation,
  }
}

///|
fn find_conflicts(
  policy : Policy,
  evaluations : Array[Evaluation],
) -> Array[Issue] {
  let issues : Array[Issue] = []
  let seen : Array[String] = []
  for evaluation in evaluations {
    let matched = matched_rules_from_evaluation(policy, evaluation)
    for left_index = 0
        left_index < matched.length()
        left_index = left_index + 1 {
      let left = matched[left_index]
      for right_index = left_index + 1
          right_index < matched.length()
          right_index = right_index + 1 {
        let right = matched[right_index]
        if left.priority != right.priority {
          continue
        }
        for left_action in left.actions {
          for right_action in right.actions {
            if left_action.output == right_action.output &&
              left_action.value != right_action.value {
              let key = conflict_key(left.id, right.id, left_action.output)
              if !contains_text(seen, key) {
                seen.push(key)
                issues.push({
                  code: "RS1001",
                  severity: Critical,
                  kind: ConflictingDecision,
                  title: "Equal-priority rules disagree on " +
                  left_action.output,
                  description: left.name +
                  " emits " +
                  left_action.value.render_quoted() +
                  " while " +
                  right.name +
                  " emits " +
                  right_action.value.render_quoted() +
                  ".",
                  rule_ids: [left.id, right.id],
                  counterexample: Some(evaluation.input),
                  evidence: [
                    {
                      rule_id: left.id,
                      title: left.name + " matched",
                      detail: "priority " + left.priority.to_string(),
                    },
                    {
                      rule_id: right.id,
                      title: right.name + " matched",
                      detail: "priority " + right.priority.to_string(),
                    },
                  ],
                  recommendation: "Make the predicates mutually exclusive or assign an explicit priority order.",
                })
              }
            }
          }
        }
      }
    }
  }
  issues
}

///|
fn matched_rules_from_evaluation(
  policy : Policy,
  evaluation : Evaluation,
) -> Array[Rule] {
  let result : Array[Rule] = []
  for id in evaluation.matched_rule_ids {
    match policy.find_rule(id) {
      Some(item) => result.push(item)
      None => ()
    }
  }
  result
}

///|
fn conflict_key(left : String, right : String, output : String) -> String {
  if left < right {
    left + ":" + right + ":" + output
  } else {
    right + ":" + left + ":" + output
  }
}

///|
fn calculate_coverage(
  policy : Policy,
  evaluations : Array[Evaluation],
) -> Array[RuleCoverage] {
  let result : Array[RuleCoverage] = []
  for item in policy.rules {
    let mut match_count = 0
    let mut win_count = 0
    for evaluation in evaluations {
      if evaluation.matched(item.id) {
        match_count = match_count + 1
      }
      for winner in winning_rule_ids(evaluation) {
        if winner == item.id {
          win_count = win_count + 1
          break
        }
      }
    }
    result.push({
      rule_id: item.id,
      match_count,
      win_count,
      total_cases: evaluations.length(),
    })
  }
  result
}

///|
fn find_unreachable_and_shadowed(
  policy : Policy,
  coverage : Array[RuleCoverage],
  evaluations : Array[Evaluation],
) -> Array[Issue] {
  let issues : Array[Issue] = []
  for row in coverage {
    match policy.find_rule(row.rule_id) {
      None => ()
      Some(item) =>
        if row.match_count == 0 {
          issues.push({
            code: "RS2001",
            severity: Warning,
            kind: UnreachableRule,
            title: "Rule " + item.id + " is unreachable",
            description: item.name +
            " did not match any generated boundary case.",
            rule_ids: [item.id],
            counterexample: None,
            evidence: [],
            recommendation: "Check contradictory predicates, field bounds, and enumeration spelling.",
          })
        } else if row.win_count == 0 {
          let witness = first_matching_input(evaluations, item.id)
          issues.push({
            code: "RS2002",
            severity: Warning,
            kind: ShadowedRule,
            title: "Rule " + item.id + " is always shadowed",
            description: item.name +
            " matched " +
            row.match_count.to_string() +
            " cases but never won an output.",
            rule_ids: [item.id],
            counterexample: witness,
            evidence: [],
            recommendation: "Narrow the higher-priority rule, raise this priority, or remove dead policy text.",
          })
        }
    }
  }
  issues
}

///|
fn first_matching_input(
  evaluations : Array[Evaluation],
  rule_id : String,
) -> InputCase? {
  for evaluation in evaluations {
    if evaluation.matched(rule_id) {
      return Some(evaluation.input)
    }
  }
  None
}

///|
fn find_coverage_gaps(
  policy : Policy,
  evaluations : Array[Evaluation],
) -> Array[Issue] {
  let issues : Array[Issue] = []
  for output in policy.output_fields() {
    let mut uncovered = 0
    let mut witness : InputCase? = None
    for evaluation in evaluations {
      if evaluation.decision_for(output.name) is None {
        uncovered = uncovered + 1
        if witness is None {
          witness = Some(evaluation.input)
        }
      }
    }
    if uncovered > 0 {
      let severe = uncovered * 5 > evaluations.length()
      issues.push({
        code: "RS3001",
        severity: if severe {
          Warning
        } else {
          Information
        },
        kind: CoverageGap,
        title: "Output " + output.name + " has uncovered inputs",
        description: uncovered.to_string() +
        " of " +
        evaluations.length().to_string() +
        " boundary cases have no value for " +
        output.name +
        ".",
        rule_ids: [],
        counterexample: witness,
        evidence: [],
        recommendation: "Add an explicit default rule or document caller behavior for missing decisions.",
      })
    }
  }
  issues
}

///|
fn find_redundant_predicates(policy : Policy) -> Array[Issue] {
  let issues : Array[Issue] = []
  for item in policy.rules {
    for left_index = 0
        left_index < item.predicates.length()
        left_index = left_index + 1 {
      for right_index = left_index + 1
          right_index < item.predicates.length()
          right_index = right_index + 1 {
        if item.predicates[left_index] == item.predicates[right_index] {
          issues.push({
            code: "RS5001",
            severity: Information,
            kind: RedundantPredicate,
            title: "Rule " + item.id + " repeats a predicate",
            description: item.predicates[left_index].field +
            " " +
            item.predicates[left_index].operator.render() +
            " " +
            item.predicates[left_index].expected.render_quoted() +
            " appears more than once.",
            rule_ids: [item.id],
            counterexample: None,
            evidence: [],
            recommendation: "Remove the repeated predicate to keep the rule concise.",
          })
        }
      }
    }
  }
  issues
}

///|
fn find_duplicate_rules(policy : Policy) -> Array[Issue] {
  let issues : Array[Issue] = []
  for left_index = 0
      left_index < policy.rules.length()
      left_index = left_index + 1 {
    let left = policy.rules[left_index]
    for right_index = left_index + 1
        right_index < policy.rules.length()
        right_index = right_index + 1 {
      let right = policy.rules[right_index]
      if left.predicates == right.predicates &&
        left.actions == right.actions &&
        left.priority == right.priority {
        issues.push({
          code: "RS5002",
          severity: Information,
          kind: DuplicateRule,
          title: "Rules " + left.id + " and " + right.id + " are duplicates",
          description: "Both rules have the same predicates, actions, and priority.",
          rule_ids: [left.id, right.id],
          counterexample: None,
          evidence: [],
          recommendation: "Keep one rule and merge any documentation or tags.",
        })
      }
    }
  }
  issues
}

///|
fn calculate_stats(
  issues : Array[Issue],
  evaluations : Array[Evaluation],
) -> AnalysisStats {
  let mut covered = 0
  for evaluation in evaluations {
    if evaluation.is_covered() {
      covered = covered + 1
    }
  }
  let mut critical = 0
  let mut warnings = 0
  let mut information = 0
  for issue in issues {
    match issue.severity {
      Critical => critical = critical + 1
      Warning => warnings = warnings + 1
      Information => information = information + 1
    }
  }
  {
    candidate_cases: evaluations.length(),
    covered_cases: covered,
    uncovered_cases: evaluations.length() - covered,
    conflict_count: critical,
    warning_count: warnings,
    information_count: information,
  }
}

///|
fn contains_text(values : Array[String], candidate : String) -> Bool {
  for value in values {
    if value == candidate {
      return true
    }
  }
  false
}

///|
pub fn AnalysisReport::render_text(self : AnalysisReport) -> String {
  let mut rendered = "RuleScope report: " + self.policy_name + "\n"
  rendered = rendered +
    "cases=" +
    self.stats.candidate_cases.to_string() +
    " coverage=" +
    self.stats.coverage_percent().to_string() +
    "% issues=" +
    self.issues.length().to_string() +
    "\n"
  for index = 0; index < self.issues.length(); index = index + 1 {
    let issue = self.issues[index]
    rendered = rendered +
      (index + 1).to_string() +
      ". [" +
      issue.code +
      "] " +
      issue.title +
      "\n"
    rendered = rendered + "   " + issue.description + "\n"
    match issue.counterexample {
      Some(input) => rendered = rendered + "   example " + input.render() + "\n"
      None => ()
    }
  }
  rendered
}
