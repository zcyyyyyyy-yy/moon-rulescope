///|
pub fn engine_version() -> String {
  "0.1.0"
}

///|
pub fn analyze_scenario(name : String) -> String {
  let selected = match name {
    "checkout" => Some(@rs.checkout_policy())
    "expense" => Some(@rs.expense_policy())
    "content" => Some(@rs.content_policy())
    "insurance" => Some(@rs.insurance_policy())
    "clean-age" => Some(@rs.clean_age_policy())
    _ => None
  }
  match selected {
    Some(policy) => @rs.analyze(policy).render_text()
    None => "Unknown RuleScope scenario: " + name
  }
}

///|
pub fn diff_age_policy() -> String {
  @rs.diff_policies(@rs.clean_age_policy(), @rs.age_policy_v2()).render_text()
}
