///|
/// A deliberately conflicting checkout policy used by the playground,
/// documentation, command-line demonstration, and regression tests.
pub fn checkout_policy() -> Policy {
  let fields : Array[Field] = [
    input_field("age", Integer(0, 100), 3),
    input_field("tier", Enumeration(["standard", "plus", "vip"]), 4),
    input_field("region", Enumeration(["cn", "eu", "us"]), 5),
    input_field("amount", Integer(0, 5000), 6),
    input_field("digital", Boolean, 7),
    output_field("decision", Enumeration(["allow", "deny", "review"]), 9),
    output_field("discount", Integer(0, 30), 10),
  ]
  let rules : Array[Rule] = [
    {
      id: "R001",
      name: "Minors cannot place high-value orders",
      priority: 100,
      predicates: [
        predicate("age", LessThan, IntValue(18), 13),
        predicate("amount", GreaterOrEqual, IntValue(1000), 13),
      ],
      actions: [action("decision", TextValue("deny"), 14)],
      source_line: 12,
      tags: ["safety", "minor"],
      enabled: true,
    },
    {
      id: "R002",
      name: "VIP orders receive fast approval",
      priority: 100,
      predicates: [
        predicate("tier", Equal, TextValue("vip"), 17),
        predicate("amount", GreaterOrEqual, IntValue(500), 17),
      ],
      actions: [action("decision", TextValue("allow"), 18)],
      source_line: 16,
      tags: ["vip", "conversion"],
      enabled: true,
    },
    {
      id: "R003",
      name: "EU digital goods require review",
      priority: 80,
      predicates: [
        predicate("region", Equal, TextValue("eu"), 21),
        predicate("digital", Equal, BoolValue(true), 21),
      ],
      actions: [action("decision", TextValue("review"), 22)],
      source_line: 20,
      tags: ["eu", "digital"],
      enabled: true,
    },
    {
      id: "R004",
      name: "Large VIP discount",
      priority: 60,
      predicates: [
        predicate("tier", Equal, TextValue("vip"), 25),
        predicate("amount", GreaterOrEqual, IntValue(1000), 25),
      ],
      actions: [action("discount", IntValue(20), 26)],
      source_line: 24,
      tags: ["vip", "discount"],
      enabled: true,
    },
    {
      id: "R005",
      name: "Large order discount",
      priority: 50,
      predicates: [predicate("amount", GreaterOrEqual, IntValue(1000), 29)],
      actions: [action("discount", IntValue(10), 30)],
      source_line: 28,
      tags: ["discount"],
      enabled: true,
    },
    {
      id: "R006",
      name: "Regular adult orders are allowed",
      priority: 10,
      predicates: [
        predicate("amount", LessThan, IntValue(1000), 33),
        predicate("age", GreaterOrEqual, IntValue(18), 33),
      ],
      actions: [action("decision", TextValue("allow"), 34)],
      source_line: 32,
      tags: ["default"],
      enabled: true,
    },
  ]
  {
    name: "Checkout policy",
    version: "1.0.0",
    fields,
    rules,
    description: "Demonstrates equal-priority conflict, precedence, and coverage gaps.",
  }
}

///|
pub fn expense_policy() -> Policy {
  let fields : Array[Field] = [
    input_field("amount", Integer(0, 50000), 3),
    input_field("level", Enumeration(["staff", "manager", "director"]), 4),
    input_field("receipt", Boolean, 5),
    input_field("category", Enumeration(["travel", "meal", "equipment"]), 6),
    output_field("decision", Enumeration(["approve", "reject", "review"]), 8),
  ]
  let rules : Array[Rule] = [
    rule(
      "E001",
      "Reject large claims without a receipt",
      100,
      [
        predicate("receipt", Equal, BoolValue(false), 11),
        predicate("amount", GreaterOrEqual, IntValue(500), 11),
      ],
      [action("decision", TextValue("reject"), 12)],
    ),
    rule(
      "E002",
      "Directors can self-approve small claims",
      100,
      [
        predicate("level", Equal, TextValue("director"), 15),
        predicate("amount", LessThan, IntValue(3000), 15),
      ],
      [action("decision", TextValue("approve"), 16)],
    ),
    rule(
      "E003",
      "Equipment purchases require review",
      80,
      [
        predicate("category", Equal, TextValue("equipment"), 19),
        predicate("amount", GreaterOrEqual, IntValue(1000), 19),
      ],
      [action("decision", TextValue("review"), 20)],
    ),
    rule(
      "E004",
      "Managers can approve normal travel",
      70,
      [
        predicate("level", Equal, TextValue("manager"), 23),
        predicate("category", Equal, TextValue("travel"), 23),
        predicate("amount", LessThan, IntValue(5000), 23),
      ],
      [action("decision", TextValue("approve"), 24)],
    ),
    rule(
      "E005",
      "Small claims pass automatically",
      60,
      [predicate("amount", LessThan, IntValue(800), 27)],
      [action("decision", TextValue("approve"), 28)],
    ),
  ]
  {
    name: "Expense policy",
    version: "1.0.0",
    fields,
    rules,
    description: "Expense approval policy with receipt, role, and category boundaries.",
  }
}

///|
pub fn content_policy() -> Policy {
  let fields : Array[Field] = [
    input_field("age", Integer(0, 100), 3),
    input_field("member", Enumeration(["guest", "normal", "premium"]), 4),
    input_field("rating", Enumeration(["general", "teen", "adult"]), 5),
    input_field("region", Enumeration(["cn", "eu", "us"]), 6),
    output_field("access", Enumeration(["allow", "deny", "verify"]), 8),
  ]
  let rules : Array[Rule] = [
    rule(
      "C001",
      "Minors cannot access adult content",
      100,
      [
        predicate("age", LessThan, IntValue(18), 11),
        predicate("rating", Equal, TextValue("adult"), 11),
      ],
      [action("access", TextValue("deny"), 12)],
    ),
    rule(
      "C002",
      "Premium members can access all content",
      100,
      [predicate("member", Equal, TextValue("premium"), 15)],
      [action("access", TextValue("allow"), 16)],
    ),
    rule(
      "C003",
      "EU guests must verify",
      80,
      [
        predicate("region", Equal, TextValue("eu"), 19),
        predicate("member", Equal, TextValue("guest"), 19),
      ],
      [action("access", TextValue("verify"), 20)],
    ),
    rule(
      "C004",
      "General content is open",
      40,
      [predicate("rating", Equal, TextValue("general"), 23)],
      [action("access", TextValue("allow"), 24)],
    ),
    rule(
      "C005",
      "Adults can access content",
      30,
      [predicate("age", GreaterOrEqual, IntValue(18), 27)],
      [action("access", TextValue("allow"), 28)],
    ),
  ]
  {
    name: "Content access policy",
    version: "1.0.0",
    fields,
    rules,
    description: "Age, membership, regional verification, and rating policy.",
  }
}

///|
pub fn insurance_policy() -> Policy {
  let fields : Array[Field] = [
    input_field("age", Integer(0, 100), 3),
    input_field("claim", Integer(0, 100000), 4),
    input_field("history", Enumeration(["clear", "minor", "major"]), 5),
    input_field("documents", Boolean, 6),
    output_field("decision", Enumeration(["accept", "reject", "manual"]), 8),
    output_field("risk", Enumeration(["low", "medium", "high"]), 9),
  ]
  let rules : Array[Rule] = [
    rule(
      "I001",
      "Missing documents require manual review",
      100,
      [predicate("documents", Equal, BoolValue(false), 12)],
      [action("decision", TextValue("manual"), 13)],
    ),
    rule(
      "I002",
      "Major history rejects large claims",
      90,
      [
        predicate("history", Equal, TextValue("major"), 16),
        predicate("claim", GreaterOrEqual, IntValue(20000), 16),
      ],
      [action("decision", TextValue("reject"), 17)],
    ),
    rule(
      "I003",
      "Senior large claims need manual review",
      80,
      [
        predicate("age", GreaterOrEqual, IntValue(70), 20),
        predicate("claim", GreaterOrEqual, IntValue(10000), 20),
      ],
      [action("decision", TextValue("manual"), 21)],
    ),
    rule(
      "I004",
      "Small claims are accepted",
      60,
      [predicate("claim", LessThan, IntValue(5000), 24)],
      [action("decision", TextValue("accept"), 25)],
    ),
    rule(
      "I005",
      "Major history is high risk",
      50,
      [predicate("history", Equal, TextValue("major"), 28)],
      [action("risk", TextValue("high"), 29)],
    ),
    rule(
      "I006",
      "Clear history is low risk",
      40,
      [predicate("history", Equal, TextValue("clear"), 32)],
      [action("risk", TextValue("low"), 33)],
    ),
  ]
  {
    name: "Insurance intake policy",
    version: "1.0.0",
    fields,
    rules,
    description: "Claim intake policy with two independent outputs.",
  }
}

///|
pub fn clean_age_policy() -> Policy {
  policy(
    "Clean age gate",
    [
      input_field("age", Integer(0, 120), 1),
      output_field("access", Enumeration(["allow", "deny"]), 2),
    ],
    [
      rule(
        "A001",
        "Deny minors",
        100,
        [predicate("age", LessThan, IntValue(18), 3)],
        [action("access", TextValue("deny"), 4)],
      ),
      rule(
        "A002",
        "Allow adults",
        100,
        [predicate("age", GreaterOrEqual, IntValue(18), 5)],
        [action("access", TextValue("allow"), 6)],
      ),
    ],
  )
}

///|
pub fn conflicting_age_policy() -> Policy {
  policy(
    "Conflicting age gate",
    [
      input_field("age", Integer(0, 120), 1),
      input_field("member", Boolean, 2),
      output_field("access", Enumeration(["allow", "deny"]), 3),
    ],
    [
      rule(
        "X001",
        "Deny minors",
        100,
        [predicate("age", LessThan, IntValue(18), 4)],
        [action("access", TextValue("deny"), 5)],
      ),
      rule(
        "X002",
        "Allow members",
        100,
        [predicate("member", Equal, BoolValue(true), 6)],
        [action("access", TextValue("allow"), 7)],
      ),
    ],
  )
}

///|
pub fn shadowed_policy() -> Policy {
  policy(
    "Shadow demonstration",
    [
      input_field("amount", Integer(0, 1000), 1),
      output_field("band", Enumeration(["low", "high"]), 2),
    ],
    [
      rule(
        "S001",
        "High priority default",
        100,
        [predicate("amount", GreaterOrEqual, IntValue(0), 3)],
        [action("band", TextValue("high"), 4)],
      ),
      rule(
        "S002",
        "Low amount rule",
        10,
        [predicate("amount", LessThan, IntValue(100), 5)],
        [action("band", TextValue("low"), 6)],
      ),
    ],
  )
}

///|
pub fn unreachable_policy() -> Policy {
  policy(
    "Unreachable demonstration",
    [
      input_field("score", Integer(0, 100), 1),
      output_field("result", Enumeration(["pass", "fail"]), 2),
    ],
    [
      rule(
        "U001",
        "Impossible score",
        100,
        [
          predicate("score", LessThan, IntValue(20), 3),
          predicate("score", GreaterThan, IntValue(80), 3),
        ],
        [action("result", TextValue("fail"), 4)],
      ),
      rule(
        "U002",
        "Passing score",
        50,
        [predicate("score", GreaterOrEqual, IntValue(60), 5)],
        [action("result", TextValue("pass"), 6)],
      ),
    ],
  )
}

///|
pub fn duplicate_policy() -> Policy {
  let condition = predicate("enabled", Equal, BoolValue(true), 3)
  let effect = action("decision", TextValue("allow"), 4)
  policy(
    "Duplicate demonstration",
    [
      input_field("enabled", Boolean, 1),
      output_field("decision", Enumeration(["allow", "deny"]), 2),
    ],
    [
      rule("D001", "First copy", 10, [condition], [effect]),
      rule("D002", "Second copy", 10, [condition], [effect]),
    ],
  )
}

///|
pub fn redundant_predicate_policy() -> Policy {
  let repeated = predicate("active", Equal, BoolValue(true), 3)
  policy(
    "Redundant predicate demonstration",
    [
      input_field("active", Boolean, 1),
      output_field("decision", Enumeration(["allow", "deny"]), 2),
    ],
    [
      rule("P001", "Repeated condition", 10, [repeated, repeated], [
        action("decision", TextValue("allow"), 4),
      ]),
    ],
  )
}

///|
pub fn age_policy_v2() -> Policy {
  policy(
    "Clean age gate v2",
    [
      input_field("age", Integer(0, 120), 1),
      output_field("access", Enumeration(["allow", "deny", "review"]), 2),
    ],
    [
      rule(
        "A001",
        "Deny children",
        100,
        [predicate("age", LessThan, IntValue(16), 3)],
        [action("access", TextValue("deny"), 4)],
      ),
      rule(
        "A003",
        "Review young users",
        100,
        [
          predicate("age", GreaterOrEqual, IntValue(16), 5),
          predicate("age", LessThan, IntValue(18), 5),
        ],
        [action("access", TextValue("review"), 6)],
      ),
      rule(
        "A002",
        "Allow adults",
        100,
        [predicate("age", GreaterOrEqual, IntValue(18), 7)],
        [action("access", TextValue("allow"), 8)],
      ),
    ],
  )
}
