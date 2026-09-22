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
}

///|
fn selected_policy(name : String) -> @rs.Policy? {
  match name {
    "checkout" => Some(@rs.checkout_policy())
    "expense" => Some(@rs.expense_policy())
    "content" => Some(@rs.content_policy())
    "insurance" => Some(@rs.insurance_policy())
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
  match selected_policy(command) {
    Some(policy) => {
      let report = @rs.analyze(policy)
      println(report.render_text())
    }
    None => {
      println("Unknown scenario: " + command)
      println("")
      print_help()
    }
  }
}
