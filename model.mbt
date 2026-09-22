///|
/// A field declaration. Fields are immutable once a policy has been parsed.
pub struct Field {
  name : String
  kind : FieldKind
  role : FieldRole
  source_line : Int
} derive(Eq, Debug)

///|
/// An atomic comparison inside a rule predicate.
pub struct Predicate {
  field : String
  operator : CompareOp
  expected : Value
  source_line : Int
} derive(Eq, Debug)

///|
/// One output assignment made by a matching rule.
pub struct Action {
  output : String
  value : Value
  source_line : Int
} derive(Eq, Debug)

///|
/// Rules use conjunction semantics in the stable DSL: every predicate must
/// match before any action is considered. Disjunction can be represented as
/// multiple named rules, which keeps counterexamples and coverage explicit.
pub struct Rule {
  id : String
  name : String
  priority : Int
  predicates : Array[Predicate]
  actions : Array[Action]
  source_line : Int
  tags : Array[String]
  enabled : Bool
} derive(Eq, Debug)

///|
/// A complete policy program.
pub struct Policy {
  name : String
  version : String
  fields : Array[Field]
  rules : Array[Rule]
  description : String
} derive(Eq, Debug)

///|
/// A concrete field assignment. Arrays are used instead of hash maps so
/// serialized output and diagnostics preserve a stable, human-friendly order.
pub struct Binding {
  field : String
  value : Value
} derive(Eq, Debug)

///|
pub struct InputCase {
  bindings : Array[Binding]
} derive(Eq, Debug)

///|
pub struct OutputDecision {
  output : String
  value : Value
  priority : Int
  rule_id : String
} derive(Eq, Debug)

///|
pub struct RuleMatch {
  rule_id : String
  rule_name : String
  matched : Bool
  failed_predicates : Array[Predicate]
} derive(Eq, Debug)

///|
pub struct Evaluation {
  input : InputCase
  matches : Array[RuleMatch]
  decisions : Array[OutputDecision]
  matched_rule_ids : Array[String]
} derive(Eq, Debug)

///|
pub enum Severity {
  Critical
  Warning
  Information
} derive(Eq, Debug)

///|
pub enum IssueKind {
  ConflictingDecision
  ShadowedRule
  UnreachableRule
  CoverageGap
  InvalidDeclaration
  RedundantPredicate
  DuplicateRule
} derive(Eq, Debug)

///|
pub struct EvidenceStep {
  rule_id : String
  title : String
  detail : String
} derive(Eq, Debug)

///|
pub struct Issue {
  code : String
  severity : Severity
  kind : IssueKind
  title : String
  description : String
  rule_ids : Array[String]
  counterexample : InputCase?
  evidence : Array[EvidenceStep]
  recommendation : String
} derive(Eq, Debug)

///|
pub struct RuleCoverage {
  rule_id : String
  match_count : Int
  win_count : Int
  total_cases : Int
} derive(Eq, Debug)

///|
pub struct AnalysisStats {
  candidate_cases : Int
  covered_cases : Int
  uncovered_cases : Int
  conflict_count : Int
  warning_count : Int
  information_count : Int
} derive(Eq, Debug)

///|
pub struct AnalysisReport {
  policy_name : String
  issues : Array[Issue]
  coverage : Array[RuleCoverage]
  evaluations : Array[Evaluation]
  stats : AnalysisStats
} derive(Eq, Debug)

///|
pub fn input_field(name : String, kind : FieldKind, line : Int) -> Field {
  { name, kind, role: InputField, source_line: line }
}

///|
pub fn output_field(name : String, kind : FieldKind, line : Int) -> Field {
  { name, kind, role: OutputField, source_line: line }
}

///|
pub fn predicate(
  field : String,
  operator : CompareOp,
  expected : Value,
  line : Int,
) -> Predicate {
  { field, operator, expected, source_line: line }
}

///|
pub fn action(output : String, value : Value, line : Int) -> Action {
  { output, value, source_line: line }
}

///|
pub fn rule(
  id : String,
  name : String,
  priority : Int,
  predicates : Array[Predicate],
  actions : Array[Action],
) -> Rule {
  {
    id,
    name,
    priority,
    predicates,
    actions,
    source_line: 0,
    tags: [],
    enabled: true,
  }
}

///|
pub fn policy(
  name : String,
  fields : Array[Field],
  rules : Array[Rule],
) -> Policy {
  { name, version: "1", fields, rules, description: "" }
}

///|
pub fn Policy::input_fields(self : Policy) -> Array[Field] {
  self.fields.filter(fn(field) { field.role == InputField })
}

///|
pub fn Policy::output_fields(self : Policy) -> Array[Field] {
  self.fields.filter(fn(field) { field.role == OutputField })
}

///|
pub fn Policy::find_field(self : Policy, name : String) -> Field? {
  for field in self.fields {
    if field.name == name {
      return Some(field)
    }
  }
  None
}

///|
pub fn Policy::find_rule(self : Policy, id : String) -> Rule? {
  for item in self.rules {
    if item.id == id {
      return Some(item)
    }
  }
  None
}

///|
pub fn Policy::enabled_rules(self : Policy) -> Array[Rule] {
  self.rules.filter(fn(item) { item.enabled })
}

///|
pub fn Policy::has_field(self : Policy, name : String) -> Bool {
  self.find_field(name) is Some(_)
}

///|
pub fn Policy::rule_count(self : Policy) -> Int {
  self.rules.length()
}

///|
pub fn Policy::input_count(self : Policy) -> Int {
  self.input_fields().length()
}

///|
pub fn Policy::output_count(self : Policy) -> Int {
  self.output_fields().length()
}

///|
pub fn InputCase::empty() -> InputCase {
  { bindings: [] }
}

///|
pub fn InputCase::from_bindings(bindings : Array[Binding]) -> InputCase {
  { bindings, }
}

///|
pub fn InputCase::get(self : InputCase, field : String) -> Value? {
  for binding in self.bindings {
    if binding.field == field {
      return Some(binding.value)
    }
  }
  None
}

///|
pub fn InputCase::contains(self : InputCase, field : String) -> Bool {
  self.get(field) is Some(_)
}

///|
pub fn InputCase::with_binding(
  self : InputCase,
  field : String,
  value : Value,
) -> InputCase {
  let result = self.bindings.copy()
  let mut replaced = false
  for index = 0; index < result.length(); index = index + 1 {
    if result[index].field == field {
      result[index] = { field, value }
      replaced = true
    }
  }
  if !replaced {
    result.push({ field, value })
  }
  { bindings: result }
}

///|
pub fn InputCase::render(self : InputCase) -> String {
  let mut rendered = "{"
  for index = 0; index < self.bindings.length(); index = index + 1 {
    if index > 0 {
      rendered = rendered + ", "
    }
    let binding = self.bindings[index]
    rendered = rendered + binding.field + ": " + binding.value.render_quoted()
  }
  rendered + "}"
}

///|
pub fn Severity::render(self : Severity) -> String {
  match self {
    Critical => "critical"
    Warning => "warning"
    Information => "information"
  }
}

///|
pub fn IssueKind::render(self : IssueKind) -> String {
  match self {
    ConflictingDecision => "conflicting-decision"
    ShadowedRule => "shadowed-rule"
    UnreachableRule => "unreachable-rule"
    CoverageGap => "coverage-gap"
    InvalidDeclaration => "invalid-declaration"
    RedundantPredicate => "redundant-predicate"
    DuplicateRule => "duplicate-rule"
  }
}

///|
pub fn AnalysisStats::coverage_percent(self : AnalysisStats) -> Int {
  if self.candidate_cases == 0 {
    0
  } else {
    self.covered_cases * 100 / self.candidate_cases
  }
}

///|
pub fn AnalysisReport::critical_issues(self : AnalysisReport) -> Array[Issue] {
  self.issues.filter(fn(issue) { issue.severity == Critical })
}

///|
pub fn AnalysisReport::warnings(self : AnalysisReport) -> Array[Issue] {
  self.issues.filter(fn(issue) { issue.severity == Warning })
}

///|
pub fn AnalysisReport::information(self : AnalysisReport) -> Array[Issue] {
  self.issues.filter(fn(issue) { issue.severity == Information })
}

///|
pub fn AnalysisReport::find_issue(
  self : AnalysisReport,
  code : String,
) -> Issue? {
  for issue in self.issues {
    if issue.code == code {
      return Some(issue)
    }
  }
  None
}

///|
pub fn AnalysisReport::is_clean(self : AnalysisReport) -> Bool {
  self.issues.length() == 0
}
