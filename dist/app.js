const samples = {
  checkout: {
    name: "电商结算策略",
    source: `policy "电商结算策略"

field age: int 0..100
field tier: enum [standard, plus, vip]
field region: enum [cn, eu, us]
field amount: int 0..5000
field digital: bool

output decision: enum [allow, deny, review]
output discount: int 0..30

rule "未成年人禁止高额订单" priority 100
  when age < 18 and amount >= 1000
  then decision = deny

rule "VIP 订单快速放行" priority 100
  when tier = vip and amount >= 500
  then decision = allow

rule "欧盟数字商品复核" priority 80
  when region = eu and digital = true
  then decision = review

rule "VIP 大额折扣" priority 60
  when tier = vip and amount >= 1000
  then discount = 20

rule "全场大额折扣" priority 50
  when amount >= 1000
  then discount = 10

rule "普通订单放行" priority 10
  when amount < 1000 and age >= 18
  then decision = allow`,
  },
  expense: {
    name: "费用报销策略",
    source: `policy "费用报销策略"

field amount: int 0..50000
field level: enum [staff, manager, director]
field receipt: bool
field category: enum [travel, meal, equipment]

output decision: enum [approve, reject, review]

rule "无票据拒绝" priority 100
  when receipt = false and amount >= 500
  then decision = reject

rule "总监小额直批" priority 100
  when level = director and amount < 3000
  then decision = approve

rule "设备采购复核" priority 80
  when category = equipment and amount >= 1000
  then decision = review

rule "经理差旅直批" priority 70
  when level = manager and category = travel and amount < 5000
  then decision = approve

rule "小额自动通过" priority 60
  when amount < 800
  then decision = approve`,
  },
  content: {
    name: "内容访问策略",
    source: `policy "内容访问策略"

field age: int 0..100
field member: enum [guest, normal, premium]
field rating: enum [general, teen, adult]
field region: enum [cn, eu, us]

output access: enum [allow, deny, verify]

rule "未成年人禁止成人内容" priority 100
  when age < 18 and rating = adult
  then access = deny

rule "高级会员访问全部内容" priority 100
  when member = premium
  then access = allow

rule "欧盟访客需要验证" priority 80
  when region = eu and member = guest
  then access = verify

rule "普通内容开放" priority 40
  when rating = general
  then access = allow

rule "成年用户开放" priority 30
  when age >= 18
  then access = allow`,
  },
  insurance: {
    name: "保险受理策略",
    source: `policy "保险受理策略"

field age: int 0..100
field claim: int 0..100000
field history: enum [clear, minor, major]
field documents: bool

output decision: enum [accept, reject, manual]
output risk: enum [low, medium, high]

rule "材料缺失人工处理" priority 100
  when documents = false
  then decision = manual

rule "重大历史拒绝大额申请" priority 90
  when history = major and claim >= 20000
  then decision = reject

rule "高龄大额人工复核" priority 80
  when age >= 70 and claim >= 10000
  then decision = manual

rule "低额申请自动受理" priority 60
  when claim < 5000
  then decision = accept

rule "重大历史高风险" priority 50
  when history = major
  then risk = high

rule "清白历史低风险" priority 40
  when history = clear
  then risk = low`,
  },
};

const elements = {
  editor: document.querySelector("#policy-editor"),
  lineNumbers: document.querySelector("#line-numbers"),
  lineCount: document.querySelector("#line-count"),
  cursor: document.querySelector("#cursor-position"),
  policyName: document.querySelector("#policy-name"),
  saveState: document.querySelector("#save-state"),
  sampleSelect: document.querySelector("#sample-select"),
  runButton: document.querySelector("#run-button"),
  formatButton: document.querySelector("#format-button"),
  resetButton: document.querySelector("#reset-button"),
  shareButton: document.querySelector("#share-button"),
  exportJsonButton: document.querySelector("#export-json-button"),
  runSummary: document.querySelector("#run-summary"),
  gateCard: document.querySelector("#gate-card"),
  gateStatus: document.querySelector("#gate-status"),
  gateDetail: document.querySelector("#gate-detail"),
  riskScore: document.querySelector("#risk-score"),
  issueDelta: document.querySelector("#issue-delta"),
  coverageValue: document.querySelector("#coverage-value"),
  coverageMeter: document.querySelector("#coverage-meter"),
  pathCount: document.querySelector("#path-count"),
  tabIssueCount: document.querySelector("#tab-issue-count"),
  issueList: document.querySelector("#issue-list"),
  coverageList: document.querySelector("#coverage-list"),
  traceInputs: document.querySelector("#trace-inputs"),
  traceButton: document.querySelector("#trace-button"),
  traceOutput: document.querySelector("#trace-output"),
  inspector: document.querySelector(".inspector-panel"),
  inspectorEmpty: document.querySelector("#inspector-empty"),
  inspectorContent: document.querySelector("#inspector-content"),
  evidenceId: document.querySelector("#evidence-id"),
  inspectorClose: document.querySelector("#inspector-close"),
  engineLabel: document.querySelector("#engine-label"),
  evidenceSeverity: document.querySelector("#evidence-severity"),
  evidenceCode: document.querySelector("#evidence-code"),
  evidenceTitle: document.querySelector("#evidence-title"),
  evidenceDescription: document.querySelector("#evidence-description"),
  counterexample: document.querySelector("#counterexample"),
  matchChain: document.querySelector("#match-chain"),
  recommendation: document.querySelector("#recommendation-text"),
  copyCounterexample: document.querySelector("#copy-counterexample"),
  toastRegion: document.querySelector("#toast-region"),
};

const state = {
  sampleKey: "checkout",
  policy: null,
  report: null,
  selectedIssue: null,
  severity: "all",
};

class PolicySyntaxError extends Error {
  constructor(message, line) {
    super(message);
    this.name = "PolicySyntaxError";
    this.line = line;
  }
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(raw, field) {
  const value = raw.trim();
  if (field?.type === "int") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) {
      throw new Error(`字段 ${field.name} 需要整数，实际得到 ${value}`);
    }
    return parsed;
  }
  if (field?.type === "bool") {
    if (value === "true") return true;
    if (value === "false") return false;
    throw new Error(`字段 ${field.name} 需要 true 或 false`);
  }
  return unquote(value);
}

function parseField(line, lineNumber, role) {
  const match = line.match(/^(?:field|output)\s+([A-Za-z_][\w-]*)\s*:\s*(.+)$/);
  if (!match) {
    throw new PolicySyntaxError(`无法解析${role === "input" ? "字段" : "输出"}声明`, lineNumber);
  }
  const [, name, descriptorRaw] = match;
  const descriptor = descriptorRaw.trim();
  if (descriptor === "bool") {
    return { name, role, type: "bool", values: [false, true], line: lineNumber };
  }
  const intMatch = descriptor.match(/^int\s+(-?\d+)\.\.(-?\d+)$/);
  if (intMatch) {
    const min = Number.parseInt(intMatch[1], 10);
    const max = Number.parseInt(intMatch[2], 10);
    if (min > max) {
      throw new PolicySyntaxError(`字段 ${name} 的最小值不能大于最大值`, lineNumber);
    }
    return { name, role, type: "int", min, max, line: lineNumber };
  }
  const enumMatch = descriptor.match(/^enum\s*\[(.+)]$/);
  if (enumMatch) {
    const values = enumMatch[1].split(",").map((value) => unquote(value.trim())).filter(Boolean);
    if (values.length === 0) {
      throw new PolicySyntaxError(`枚举字段 ${name} 至少需要一个候选值`, lineNumber);
    }
    return { name, role, type: "enum", values, line: lineNumber };
  }
  throw new PolicySyntaxError(`字段 ${name} 使用了未知类型：${descriptor}`, lineNumber);
}

function splitAnd(expression) {
  return expression
    .split(/\s+and\s+/i)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCondition(raw, fields, lineNumber) {
  const match = raw.match(/^([A-Za-z_][\w-]*)\s*(<=|>=|!=|=|<|>)\s*(.+)$/);
  if (!match) {
    throw new PolicySyntaxError(`无法解析条件：${raw}`, lineNumber);
  }
  const [, fieldName, operator, valueRaw] = match;
  const field = fields.get(fieldName);
  if (!field || field.role !== "input") {
    throw new PolicySyntaxError(`条件引用了未知输入字段：${fieldName}`, lineNumber);
  }
  const value = parseScalar(valueRaw, field);
  return { field: fieldName, operator, value, source: raw, line: lineNumber };
}

function parseAction(raw, fields, lineNumber) {
  const match = raw.match(/^([A-Za-z_][\w-]*)\s*=\s*(.+)$/);
  if (!match) {
    throw new PolicySyntaxError(`无法解析输出动作：${raw}`, lineNumber);
  }
  const [, fieldName, valueRaw] = match;
  const field = fields.get(fieldName);
  if (!field || field.role !== "output") {
    throw new PolicySyntaxError(`动作引用了未知输出字段：${fieldName}`, lineNumber);
  }
  const value = parseScalar(valueRaw, field);
  return { field: fieldName, value, source: raw, line: lineNumber };
}

function parsePolicy(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const fields = new Map();
  const rules = [];
  let name = "未命名规则集";
  let currentRule = null;

  const commitRule = () => {
    if (!currentRule) return;
    if (!currentRule.conditions.length) {
      throw new PolicySyntaxError(`规则「${currentRule.name}」缺少 when 条件`, currentRule.line);
    }
    if (!currentRule.actions.length) {
      throw new PolicySyntaxError(`规则「${currentRule.name}」缺少 then 动作`, currentRule.line);
    }
    currentRule.id = `R${String(rules.length + 1).padStart(3, "0")}`;
    rules.push(currentRule);
    currentRule = null;
  };

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("//")) return;
    if (line.startsWith("policy ")) {
      commitRule();
      name = unquote(line.slice("policy ".length));
      return;
    }
    if (line.startsWith("field ")) {
      commitRule();
      const field = parseField(line, lineNumber, "input");
      if (fields.has(field.name)) {
        throw new PolicySyntaxError(`字段 ${field.name} 重复声明`, lineNumber);
      }
      fields.set(field.name, field);
      return;
    }
    if (line.startsWith("output ")) {
      commitRule();
      const field = parseField(line, lineNumber, "output");
      if (fields.has(field.name)) {
        throw new PolicySyntaxError(`字段 ${field.name} 重复声明`, lineNumber);
      }
      fields.set(field.name, field);
      return;
    }
    if (line.startsWith("rule ")) {
      commitRule();
      const match = line.match(/^rule\s+"([^"]+)"(?:\s+priority\s+(-?\d+))?$/);
      if (!match) {
        throw new PolicySyntaxError("规则声明格式应为 rule \"名称\" priority 100", lineNumber);
      }
      currentRule = {
        name: match[1],
        priority: match[2] ? Number.parseInt(match[2], 10) : 0,
        conditions: [],
        actions: [],
        line: lineNumber,
      };
      return;
    }
    if (line.startsWith("when ")) {
      if (!currentRule) {
        throw new PolicySyntaxError("when 必须位于 rule 声明之后", lineNumber);
      }
      currentRule.conditions.push(
        ...splitAnd(line.slice("when ".length)).map((condition) =>
          parseCondition(condition, fields, lineNumber),
        ),
      );
      return;
    }
    if (line.startsWith("then ")) {
      if (!currentRule) {
        throw new PolicySyntaxError("then 必须位于 rule 声明之后", lineNumber);
      }
      currentRule.actions.push(
        ...line
          .slice("then ".length)
          .split(/\s*,\s*/)
          .map((action) => parseAction(action, fields, lineNumber)),
      );
      return;
    }
    throw new PolicySyntaxError(`无法识别的语句：${line}`, lineNumber);
  });

  commitRule();
  const inputs = [...fields.values()].filter((field) => field.role === "input");
  const outputs = [...fields.values()].filter((field) => field.role === "output");
  if (!inputs.length) throw new PolicySyntaxError("规则集至少需要一个输入字段", 1);
  if (!outputs.length) throw new PolicySyntaxError("规则集至少需要一个输出字段", 1);
  if (!rules.length) throw new PolicySyntaxError("规则集至少需要一条规则", 1);
  return { name, fields, inputs, outputs, rules, source };
}

function compare(left, operator, right) {
  switch (operator) {
    case "=":
      return left === right;
    case "!=":
      return left !== right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    default:
      return false;
  }
}

function matches(rule, input) {
  return rule.conditions.every((condition) =>
    compare(input[condition.field], condition.operator, condition.value),
  );
}

function evaluate(policy, input) {
  const matched = policy.rules.filter((rule) => matches(rule, input));
  const byOutput = new Map();
  const decisions = {};

  matched.forEach((rule) => {
    rule.actions.forEach((action) => {
      if (!byOutput.has(action.field)) byOutput.set(action.field, []);
      byOutput.get(action.field).push({ rule, action });
    });
  });

  byOutput.forEach((candidates, output) => {
    const sorted = [...candidates].sort((a, b) => b.rule.priority - a.rule.priority);
    decisions[output] = sorted[0].action.value;
  });

  return { input, matched, byOutput, decisions };
}

function addBoundary(candidates, field, value) {
  if (field.type !== "int") return;
  [value - 1, value, value + 1].forEach((candidate) => {
    if (candidate >= field.min && candidate <= field.max) candidates.add(candidate);
  });
}

function candidatesForField(policy, field) {
  if (field.type === "bool" || field.type === "enum") return [...field.values];
  const candidates = new Set([field.min, field.max, Math.floor((field.min + field.max) / 2)]);
  policy.rules.forEach((rule) => {
    rule.conditions
      .filter((condition) => condition.field === field.name)
      .forEach((condition) => addBoundary(candidates, field, condition.value));
  });
  return [...candidates].sort((a, b) => a - b);
}

function cartesian(entries, limit = 12000) {
  let rows = [{}];
  for (const [name, values] of entries) {
    const expanded = [];
    for (const row of rows) {
      for (const value of values) {
        expanded.push({ ...row, [name]: value });
        if (expanded.length >= limit) break;
      }
      if (expanded.length >= limit) break;
    }
    rows = expanded;
    if (rows.length >= limit) break;
  }
  return rows;
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function winningRuleId(evaluation, output) {
  const candidates = evaluation.byOutput.get(output) || [];
  if (!candidates.length) return null;
  return [...candidates].sort((left, right) => right.rule.priority - left.rule.priority)[0].rule.id;
}

function analyzeRuleImpacts(policy, inputs, baselineEvaluations) {
  return policy.rules.map((rule) => {
    const withoutRule = { ...policy, rules: policy.rules.filter((item) => item.id !== rule.id) };
    let changedCases = 0;
    let decisionChanges = 0;
    let provenanceChanges = 0;
    let firstCounterexample = null;

    inputs.forEach((input, index) => {
      const before = baselineEvaluations[index];
      const after = evaluate(withoutRule, input);
      let changed = false;
      policy.outputs.forEach((output) => {
        const beforeHasValue = Object.hasOwn(before.decisions, output.name);
        const afterHasValue = Object.hasOwn(after.decisions, output.name);
        if (
          beforeHasValue !== afterHasValue ||
          (beforeHasValue && !sameValue(before.decisions[output.name], after.decisions[output.name]))
        ) {
          decisionChanges += 1;
          changed = true;
        } else if (
          beforeHasValue &&
          winningRuleId(before, output.name) !== winningRuleId(after, output.name)
        ) {
          provenanceChanges += 1;
          changed = true;
        }
      });
      if (changed) {
        changedCases += 1;
        if (!firstCounterexample) firstCounterexample = cloneInput(input);
      }
    });

    return {
      ruleId: rule.id,
      ruleName: rule.name,
      changedCases,
      decisionChanges,
      provenanceChanges,
      firstCounterexample,
    };
  });
}

function scoreRisk(report) {
  const critical = report.issues.filter((issue) => issue.severity === "critical").length;
  const warnings = report.issues.filter((issue) => issue.severity === "warning").length;
  const information = report.issues.filter((issue) => issue.severity === "info").length;
  const uncoveredPercent = 100 - Math.floor(report.coverage * 100);
  return Math.min(100, critical * 35 + warnings * 10 + information * 2 + Math.floor(uncoveredPercent / 2));
}

function evaluateStrictGate(report) {
  const critical = report.issues.filter((issue) => issue.severity === "critical").length;
  const warnings = report.issues.filter((issue) => issue.severity === "warning").length;
  const coveragePercent = Math.floor(report.coverage * 100);
  const zeroImpactRules = report.impacts.filter((impact) => impact.changedCases === 0).length;
  const violations = [];
  if (critical > 0) violations.push(`${critical} 个冲突`);
  if (warnings > 0) violations.push(`${warnings} 个警告`);
  if (coveragePercent < 100) violations.push(`覆盖率 ${coveragePercent}%`);
  if (zeroImpactRules > 0) violations.push(`${zeroImpactRules} 条零影响规则`);
  return { passed: violations.length === 0, violations };
}

function cloneInput(input) {
  return Object.fromEntries(Object.entries(input));
}

function createIssue({ code, severity, kind, title, description, rules, counterexample, recommendation }) {
  return {
    id: `${code}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
    code,
    severity,
    kind,
    title,
    description,
    rules,
    counterexample,
    recommendation,
  };
}

function findConflicts(policy, evaluations) {
  const issues = [];
  const seenPairs = new Set();

  for (const evaluation of evaluations) {
    evaluation.byOutput.forEach((candidates, output) => {
      const topPriority = Math.max(...candidates.map((candidate) => candidate.rule.priority));
      const top = candidates.filter((candidate) => candidate.rule.priority === topPriority);
      for (let leftIndex = 0; leftIndex < top.length; leftIndex += 1) {
        for (let rightIndex = leftIndex + 1; rightIndex < top.length; rightIndex += 1) {
          const left = top[leftIndex];
          const right = top[rightIndex];
          if (sameValue(left.action.value, right.action.value)) continue;
          const pairKey = [left.rule.id, right.rule.id, output].sort().join(":");
          if (seenPairs.has(pairKey)) continue;
          seenPairs.add(pairKey);
          issues.push(
            createIssue({
              code: "RS1001",
              severity: "critical",
              kind: "conflict",
              title: `同优先级规则对 ${output} 给出矛盾结果`,
              description: `「${left.rule.name}」与「${right.rule.name}」会被同一输入同时命中，但分别输出 ${left.action.value} 和 ${right.action.value}。`,
              rules: [left.rule, right.rule],
              counterexample: cloneInput(evaluation.input),
              recommendation: `为两条规则设置明确的优先级，或增加互斥条件。建议先确认 ${output} 在该场景下的唯一预期值。`,
            }),
          );
        }
      }
    });
  }
  return issues;
}

function findShadowedRules(policy, evaluations) {
  const issues = [];
  const matchCount = new Map(policy.rules.map((rule) => [rule.id, 0]));
  const winCount = new Map(policy.rules.map((rule) => [rule.id, 0]));

  evaluations.forEach((evaluation) => {
    evaluation.matched.forEach((rule) => matchCount.set(rule.id, matchCount.get(rule.id) + 1));
    evaluation.byOutput.forEach((candidates) => {
      const topPriority = Math.max(...candidates.map((candidate) => candidate.rule.priority));
      candidates
        .filter((candidate) => candidate.rule.priority === topPriority)
        .forEach((candidate) => winCount.set(candidate.rule.id, winCount.get(candidate.rule.id) + 1));
    });
  });

  policy.rules.forEach((rule) => {
    if (matchCount.get(rule.id) === 0) {
      issues.push(
        createIssue({
          code: "RS2001",
          severity: "warning",
          kind: "unreachable",
          title: `规则「${rule.name}」在候选域内不可达`,
          description: "该规则的条件组合在字段定义域和边界候选中没有可满足输入。",
          rules: [rule],
          counterexample: {},
          recommendation: "检查条件是否互相矛盾、枚举值是否拼写正确，以及字段范围是否过窄。",
        }),
      );
    } else if (winCount.get(rule.id) === 0) {
      const witness = evaluations.find((evaluation) => evaluation.matched.some((item) => item.id === rule.id));
      issues.push(
        createIssue({
          code: "RS2002",
          severity: "warning",
          kind: "shadowed",
          title: `规则「${rule.name}」始终被更高优先级遮蔽`,
          description: `规则可以命中 ${matchCount.get(rule.id)} 条候选路径，但从未决定任何输出。`,
          rules: [rule],
          counterexample: witness ? cloneInput(witness.input) : {},
          recommendation: "确认该规则是否仍有业务价值；若需要生效，请缩小高优先级规则的范围或调整优先级。",
        }),
      );
    }
  });

  return { issues, matchCount, winCount };
}

function findCoverageGaps(policy, evaluations) {
  const issues = [];
  policy.outputs.forEach((output) => {
    const uncovered = evaluations.filter((evaluation) => !(output.name in evaluation.decisions));
    if (uncovered.length === 0) return;
    const ratio = uncovered.length / evaluations.length;
    issues.push(
      createIssue({
        code: "RS3001",
        severity: ratio > 0.2 ? "warning" : "info",
        kind: "gap",
        title: `输出 ${output.name} 存在未覆盖输入`,
        description: `${uncovered.length} / ${evaluations.length} 条边界路径没有得到 ${output.name} 的值。`,
        rules: [],
        counterexample: cloneInput(uncovered[0].input),
        recommendation: `增加 ${output.name} 的默认规则，或明确说明未命中时由调用方采取何种行为。`,
      }),
    );
  });
  return issues;
}

function analyze(policy) {
  const startedAt = performance.now();
  const domains = new Map(
    policy.inputs.map((field) => [field.name, candidatesForField(policy, field)]),
  );
  const inputs = cartesian([...domains.entries()]);
  const evaluations = inputs.map((input) => evaluate(policy, input));
  const conflicts = findConflicts(policy, evaluations);
  const shadow = findShadowedRules(policy, evaluations);
  const gaps = findCoverageGaps(policy, evaluations);
  const issues = [...conflicts, ...shadow.issues, ...gaps];
  const coveredPaths = evaluations.filter((evaluation) => Object.keys(evaluation.decisions).length > 0).length;
  const coverage = evaluations.length ? coveredPaths / evaluations.length : 0;
  const impacts = analyzeRuleImpacts(policy, inputs, evaluations);
  const duration = performance.now() - startedAt;
  const report = {
    policy,
    domains,
    inputs,
    evaluations,
    issues,
    matchCount: shadow.matchCount,
    winCount: shadow.winCount,
    coveredPaths,
    coverage,
    impacts,
    duration,
  };
  report.riskScore = scoreRisk(report);
  report.qualityGate = evaluateStrictGate(report);
  return report;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function severityLabel(severity) {
  if (severity === "critical") return "冲突";
  if (severity === "warning") return "警告";
  return "建议";
}

function updateEditorChrome() {
  const source = elements.editor.value;
  const lines = source.split("\n");
  elements.lineNumbers.innerHTML = lines.map((_, index) => `<span>${index + 1}</span>`).join("");
  elements.lineCount.textContent = `${lines.length} 行`;
  elements.lineNumbers.scrollTop = elements.editor.scrollTop;

  const selection = elements.editor.selectionStart;
  const before = source.slice(0, selection);
  const line = before.split("\n").length;
  const column = before.length - before.lastIndexOf("\n");
  elements.cursor.textContent = `Ln ${line}, Col ${column}`;
}

function renderIssues() {
  if (!state.report) return;
  const visible = state.report.issues.filter(
    (issue) => state.severity === "all" || issue.severity === state.severity,
  );
  if (!visible.length) {
    elements.issueList.innerHTML = `
      <div class="empty-state">
        <span class="empty-sigil">✓</span>
        <strong>${state.report.issues.length ? "当前筛选下没有问题" : "候选域检查通过"}</strong>
        <p>${state.report.issues.length ? "切换筛选条件查看其他分析结果。" : "没有发现冲突、遮蔽或覆盖缺口。"}</p>
      </div>`;
    return;
  }
  elements.issueList.innerHTML = visible
    .map((issue) => {
      const refs = issue.rules.length ? issue.rules.map((rule) => rule.id).join(" · ") : "DOMAIN";
      return `
        <button class="issue-card ${state.selectedIssue?.id === issue.id ? "selected" : ""}"
                data-issue-id="${escapeHtml(issue.id)}"
                data-severity="${issue.severity}" type="button">
          <span class="issue-signal" aria-hidden="true"></span>
          <span class="issue-main">
            <h3>${escapeHtml(issue.title)}</h3>
            <p>${escapeHtml(issue.description)}</p>
          </span>
          <span class="issue-meta">
            <span>${issue.code}</span>
            <span class="rule-ref">${escapeHtml(refs)}</span>
          </span>
        </button>`;
    })
    .join("");

  elements.issueList.querySelectorAll(".issue-card").forEach((card) => {
    card.addEventListener("click", () => {
      const issue = state.report.issues.find((item) => item.id === card.dataset.issueId);
      selectIssue(issue);
    });
  });
}

function renderCoverage() {
  if (!state.report) return;
  const total = state.report.evaluations.length || 1;
  elements.coverageList.innerHTML = state.policy.rules
    .map((rule) => {
      const matchesCount = state.report.matchCount.get(rule.id) || 0;
      const percentage = Math.round((matchesCount / total) * 100);
      return `
        <div class="coverage-row ${matchesCount === 0 ? "unreachable" : ""}">
          <div class="coverage-name">
            <strong>${escapeHtml(rule.name)}</strong>
            <span>${rule.id} · P${rule.priority} · ${matchesCount} MATCHES · ${state.report.impacts.find((impact) => impact.ruleId === rule.id)?.changedCases || 0} IMPACTED</span>
          </div>
          <div class="coverage-bar"><i style="width: ${Math.max(percentage, matchesCount ? 2 : 0)}%"></i></div>
          <span class="coverage-percent">${percentage}%</span>
        </div>`;
    })
    .join("");
}

function renderTraceInputs() {
  if (!state.policy || !state.report) return;
  elements.traceInputs.innerHTML = state.policy.inputs
    .map((field) => {
      const values = state.report.domains.get(field.name);
      if (field.type === "int") {
        return `
          <div class="trace-field">
            <label for="trace-${field.name}">${escapeHtml(field.name)} · ${field.min}..${field.max}</label>
            <input id="trace-${field.name}" data-trace-field="${field.name}" type="number"
              min="${field.min}" max="${field.max}" value="${values[Math.floor(values.length / 2)]}" />
          </div>`;
      }
      return `
        <div class="trace-field">
          <label for="trace-${field.name}">${escapeHtml(field.name)} · ${field.type}</label>
          <select id="trace-${field.name}" data-trace-field="${field.name}">
            ${values.map((value) => `<option value="${value}">${value}</option>`).join("")}
          </select>
        </div>`;
    })
    .join("");
}

function selectIssue(issue, openPanel = true) {
  if (!issue) return;
  state.selectedIssue = issue;
  renderIssues();
  elements.inspectorEmpty.hidden = true;
  elements.inspectorContent.hidden = false;
  if (openPanel) elements.inspector.classList.add("open");
  elements.evidenceId.textContent = issue.id;
  elements.evidenceCode.textContent = issue.code;
  elements.evidenceSeverity.textContent = severityLabel(issue.severity);
  elements.evidenceSeverity.className = `severity-badge ${issue.severity}`;
  elements.evidenceTitle.textContent = issue.title;
  elements.evidenceDescription.textContent = issue.description;
  elements.counterexample.textContent = JSON.stringify(issue.counterexample, null, 2);
  elements.matchChain.innerHTML = issue.rules.length
    ? issue.rules
        .map(
          (rule) => `<li><code>${rule.id} · P${rule.priority}</code><br />${escapeHtml(rule.name)}</li>`,
        )
        .join("")
    : "<li>该证据来自整个输入域的覆盖分析，不对应单一规则。</li>";
  elements.recommendation.textContent = issue.recommendation;
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  elements.toastRegion.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

function renderReport() {
  const report = state.report;
  const critical = report.issues.filter((issue) => issue.severity === "critical").length;
  const warnings = report.issues.filter((issue) => issue.severity === "warning").length;
  elements.gateStatus.textContent = report.qualityGate.passed ? "PASS" : "FAIL";
  elements.gateDetail.textContent = report.qualityGate.passed
    ? "冲突、覆盖与规则影响均达标"
    : report.qualityGate.violations.join(" · ");
  elements.gateCard.className = `score-card score-gate ${report.qualityGate.passed ? "passed" : "failed"}`;
  elements.riskScore.textContent = `${report.riskScore}/100`;
  elements.issueDelta.textContent = `${critical} 冲突 · ${warnings} 警告`;
  elements.coverageValue.textContent = `${Math.floor(report.coverage * 100)}%`;
  elements.coverageMeter.style.width = `${Math.floor(report.coverage * 100)}%`;
  elements.pathCount.textContent = report.evaluations.length.toLocaleString("zh-CN");
  elements.tabIssueCount.textContent = String(report.issues.length);
  elements.runSummary.className = "run-summary complete";
  elements.runSummary.innerHTML = '<span class="status-orb"></span>分析完成';
  renderIssues();
  renderCoverage();
  renderTraceInputs();
  if (report.issues.length) selectIssue(report.issues[0], false);
}

function runAnalysis() {
  try {
    state.policy = parsePolicy(elements.editor.value);
    state.report = analyze(state.policy);
    state.selectedIssue = null;
    elements.policyName.textContent = state.policy.name;
    elements.saveState.textContent = "已分析";
    renderReport();
    showToast(`已检查 ${state.report.evaluations.length} 条边界路径`);
  } catch (error) {
    elements.runSummary.className = "run-summary failed";
    elements.runSummary.innerHTML = '<span class="status-orb"></span>解析失败';
    const line = error.line ? `（第 ${error.line} 行）` : "";
    showToast(`${error.message}${line}`, "error");
    if (error.line) {
      const lines = elements.editor.value.split("\n");
      const start = lines.slice(0, error.line - 1).join("\n").length + (error.line > 1 ? 1 : 0);
      elements.editor.focus();
      elements.editor.setSelectionRange(start, start + lines[error.line - 1].length);
    }
  }
}

function renderTrace() {
  if (!state.policy) return;
  const input = {};
  elements.traceInputs.querySelectorAll("[data-trace-field]").forEach((control) => {
    const field = state.policy.fields.get(control.dataset.traceField);
    input[field.name] = parseScalar(control.value, field);
  });
  const result = evaluate(state.policy, input);
  const steps = state.policy.rules.map((rule) => ({ rule, hit: matches(rule, input) }));
  elements.traceOutput.innerHTML = `
    <div class="trace-step hit">
      <strong>输入已标准化</strong>
      <p>${escapeHtml(JSON.stringify(input))}</p>
    </div>
    ${steps
      .map(
        ({ rule, hit }) => `
          <div class="trace-step ${hit ? "hit" : ""}">
            <strong>${rule.id} · ${escapeHtml(rule.name)} · ${hit ? "命中" : "跳过"}</strong>
            <p>${escapeHtml(rule.conditions.map((condition) => condition.source).join(" AND "))}</p>
          </div>`,
      )
      .join("")}
    <div class="trace-step ${Object.keys(result.decisions).length ? "hit" : ""}">
      <strong>最终决策</strong>
      <p>${escapeHtml(JSON.stringify(result.decisions))}</p>
    </div>`;
}

function formatSource() {
  try {
    const policy = parsePolicy(elements.editor.value);
    const lines = [`policy "${policy.name}"`, ""];
    policy.inputs.forEach((field) => {
      if (field.type === "int") lines.push(`field ${field.name}: int ${field.min}..${field.max}`);
      else if (field.type === "bool") lines.push(`field ${field.name}: bool`);
      else lines.push(`field ${field.name}: enum [${field.values.join(", ")}]`);
    });
    lines.push("");
    policy.outputs.forEach((field) => {
      if (field.type === "int") lines.push(`output ${field.name}: int ${field.min}..${field.max}`);
      else if (field.type === "bool") lines.push(`output ${field.name}: bool`);
      else lines.push(`output ${field.name}: enum [${field.values.join(", ")}]`);
    });
    policy.rules.forEach((rule) => {
      lines.push("");
      lines.push(`rule "${rule.name}" priority ${rule.priority}`);
      lines.push(`  when ${rule.conditions.map((condition) => condition.source).join(" and ")}`);
      lines.push(`  then ${rule.actions.map((action) => action.source).join(", ")}`);
    });
    elements.editor.value = lines.join("\n");
    updateEditorChrome();
    showToast("规则源文件已格式化");
  } catch (error) {
    showToast(`暂时无法格式化：${error.message}`, "error");
  }
}

async function copyText(text, confirmation) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(confirmation);
  } catch {
    showToast("浏览器未允许写入剪贴板", "error");
  }
}

function reportAsMarkdown() {
  if (!state.report) return "RuleScope 尚未执行分析。";
  const lines = [
    `# RuleScope 分析报告：${state.policy.name}`,
    "",
    `- 边界路径：${state.report.evaluations.length}`,
    `- 覆盖率：${Math.round(state.report.coverage * 100)}%`,
    `- 问题数：${state.report.issues.length}`,
    `- 风险分：${state.report.riskScore}/100`,
    `- 严格门禁：${state.report.qualityGate.passed ? "PASS" : "FAIL"}`,
    "",
  ];
  state.report.issues.forEach((issue, index) => {
    lines.push(`## ${index + 1}. [${issue.code}] ${issue.title}`);
    lines.push("");
    lines.push(issue.description);
    lines.push("");
    lines.push("```json");
    lines.push(JSON.stringify(issue.counterexample, null, 2));
    lines.push("```");
    lines.push("");
    lines.push(`建议：${issue.recommendation}`);
    lines.push("");
  });
  return lines.join("\n");
}

function reportAsJson() {
  if (!state.report) return null;
  return {
    schemaVersion: "rulescope.report/v1",
    policy: state.policy.name,
    summary: {
      candidateCases: state.report.evaluations.length,
      coveredCases: state.report.coveredPaths,
      coveragePercent: Math.floor(state.report.coverage * 100),
      issueCount: state.report.issues.length,
      riskScore: state.report.riskScore,
    },
    qualityGate: state.report.qualityGate,
    issues: state.report.issues.map((issue) => ({
      code: issue.code,
      severity: issue.severity,
      kind: issue.kind,
      title: issue.title,
      description: issue.description,
      ruleIds: issue.rules.map((rule) => rule.id),
      counterexample: issue.counterexample,
      recommendation: issue.recommendation,
    })),
    ruleImpacts: state.report.impacts,
  };
}

function downloadJsonReport() {
  const report = reportAsJson();
  if (!report) return;
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.sampleKey}-rulescope-report.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("JSON 取证报告已导出");
}

function loadSample(key) {
  const sample = samples[key];
  state.sampleKey = key;
  elements.editor.value = sample.source;
  elements.policyName.textContent = sample.name;
  elements.saveState.textContent = "本地草稿";
  updateEditorChrome();
  runAnalysis();
}

elements.editor.addEventListener("input", () => {
  updateEditorChrome();
  elements.saveState.textContent = "有未分析改动";
});

elements.editor.addEventListener("click", updateEditorChrome);
elements.editor.addEventListener("keyup", updateEditorChrome);
elements.editor.addEventListener("scroll", updateEditorChrome);
elements.editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = elements.editor.selectionStart;
    const end = elements.editor.selectionEnd;
    elements.editor.setRangeText("  ", start, end, "end");
    updateEditorChrome();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runAnalysis();
  }
});

elements.sampleSelect.addEventListener("change", (event) => loadSample(event.target.value));
elements.runButton.addEventListener("click", runAnalysis);
elements.formatButton.addEventListener("click", formatSource);
elements.resetButton.addEventListener("click", () => loadSample(state.sampleKey));
elements.traceButton.addEventListener("click", renderTrace);
elements.shareButton.addEventListener("click", () => copyText(reportAsMarkdown(), "Markdown 报告已复制"));
elements.exportJsonButton.addEventListener("click", downloadJsonReport);
elements.copyCounterexample.addEventListener("click", () => {
  if (state.selectedIssue) {
    copyText(JSON.stringify(state.selectedIssue.counterexample, null, 2), "反例 JSON 已复制");
  }
});
elements.inspectorClose.addEventListener("click", () => elements.inspector.classList.remove("open"));

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#tab-${tab.dataset.tab}`).classList.add("active");
  });
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    state.severity = filter.dataset.severity;
    renderIssues();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") elements.inspector.classList.remove("open");
});

loadSample("checkout");

async function connectMoonBitCore() {
  try {
    const core = await import("./rulescope-core.js");
    const version = core.engine_version();
    const report = core.analyze_scenario("clean-age");
    if (!report.includes("RuleScope report")) throw new Error("unexpected core response");
    elements.engineLabel.textContent = `MOONBIT CORE v${version}`;
    document.documentElement.dataset.moonbitCore = "ready";
  } catch {
    elements.engineLabel.textContent = "WEB ADAPTER";
    document.documentElement.dataset.moonbitCore = "unavailable";
  }
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (definition) => {
    try {
      void Promise.resolve(context.registerTool(definition)).catch(() => {});
    } catch {
      // Unsupported experimental WebMCP implementations are ignored.
    }
  };
  register({
    name: "load_rulescope_sample",
    title: "载入规则示例",
    description: "Load one built-in RuleScope scenario into the visible editor and analyze it.",
    inputSchema: {
      type: "object",
      properties: {
        scenario: { type: "string", enum: ["checkout", "expense", "content", "insurance"] },
      },
      required: ["scenario"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !Object.hasOwn(samples, input.scenario)) throw new Error("invalid scenario");
      elements.sampleSelect.value = input.scenario;
      loadSample(input.scenario);
      return {
        policy: state.policy.name,
        candidateCases: state.report.evaluations.length,
        issueCount: state.report.issues.length,
      };
    },
  });
  register({
    name: "analyze_visible_policy",
    title: "分析当前规则",
    description: "Analyze the policy currently visible in the RuleScope editor and return summary counts.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute() {
      runAnalysis();
      if (!state.report) throw new Error("analysis failed");
      return {
        policy: state.policy.name,
        candidateCases: state.report.evaluations.length,
        coveragePercent: Math.round(state.report.coverage * 100),
        issueCount: state.report.issues.length,
      };
    },
  });
}

connectMoonBitCore();
registerWebMcpTools();
