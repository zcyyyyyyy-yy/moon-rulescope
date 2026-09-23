///|
fn print_help() -> Unit {
  println("RuleScope — explainable policy forensics")
  println("")
  println("Usage:")
  println("  moon run cmd/rulescope")
  println("  moon run cmd/rulescope -- checkout")
  println("  moon run cmd/rulescope -- expense")
  println("  moon run cmd/rulescope -- content")
  println("  moon run cmd/rulescope -- insurance")
  println("  moon run cmd/rulescope -- diff")
  println("  moon run cmd/rulescope -- impact [scenario]")
  println("  moon run cmd/rulescope -- gate [scenario] [strict|balanced]")
  println("  moon run cmd/rulescope -- json [scenario]")
}

///|
fn argument_or(
  arguments : Array[String],
  index : Int,
  fallback : String,
) -> String {
  if index < arguments.length() {
    arguments[index]
  } else {
    fallback
  }
}

///|
fn print_unknown_scenario(name : String) -> Unit {
  println("Unknown scenario: " + name)
  println("Choose checkout, expense, content, or insurance.")
}

///|
fn selected_policy(name : String) -> @rs.Policy? {
  match name {
    "checkout" => Some(@rs.checkout_policy())
    "expense" => Some(@rs.expense_policy())
    "content" => Some(@rs.content_policy())
    "insurance" => Some(@rs.insurance_policy())
    "clean-age" => Some(@rs.clean_age_policy())
    _ => None
  }
}

///|
fn main {
  let arguments = @env.args()
  let command = if arguments.length() > 2 {
    arguments[2]
  } else if arguments.length() > 1 && !arguments[1].contains(".js") {
    arguments[1]
  } else {
    "checkout"
  }
  if command == "help" || command == "--help" || command == "-h" {
    print_help()
    return
  }
  if command == "diff" {
    let difference = @rs.diff_policies(
      @rs.clean_age_policy(),
      @rs.age_policy_v2(),
    )
    println(difference.render_text())
    return
  }
  if command == "impact" {
    let scenario = argument_or(arguments, 3, "checkout")
    match selected_policy(scenario) {
      Some(policy) =>
        println(
          @rs.render_rule_impact_report(
            policy,
            @rs.analyze_rule_impacts(policy),
          ),
        )
      None => print_unknown_scenario(scenario)
    }
    return
  }
  if command == "gate" {
    let scenario = argument_or(arguments, 3, "checkout")
    let gate_name = argument_or(arguments, 4, "strict")
    match selected_policy(scenario) {
      Some(policy) => {
        let gate = if gate_name == "balanced" {
          @rs.QualityGate::balanced()
        } else {
          @rs.QualityGate::strict()
        }
        let report = @rs.analyze(policy)
        let impacts = @rs.analyze_rule_impacts(policy)
        println(@rs.evaluate_quality_gate(report, impacts, gate).render_text())
      }
      None => print_unknown_scenario(scenario)
    }
    return
  }
  if command == "json" {
    let scenario = argument_or(arguments, 3, "checkout")
    match selected_policy(scenario) {
      Some(policy) => println(@rs.analyze(policy).render_json())
      None => print_unknown_scenario(scenario)
    }
    return
  }
  match selected_policy(command) {
    Some(policy) => {
      let report = @rs.analyze(policy)
      println(report.render_text())
    }
    None => {
      print_unknown_scenario(command)
      println("")
      print_help()
    }
  }
}
