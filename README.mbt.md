# moon-rulescope 判规

> 让业务规则在上线前暴露矛盾。

RuleScope 是一个使用 MoonBit 编写的、可解释的业务规则冲突检测与行为差异分析引擎。它把规则视为可静态分析的程序：从字段定义和条件边界生成候选输入，检查同优先级冲突、不可达规则、优先级遮蔽、覆盖缺口、重复规则和版本行为变化，并为问题提供可复现的最小反例。

项目同时提供：

- MoonBit 核心库；
- MoonBit CLI；
- MoonBit 编译生成的 JavaScript 外部库；
- 无服务端、可离线运行的浏览器工作台；
- 45 个确定性测试和四个业务示例；
- 比赛申报、架构、演示和验收文档。

## 为什么需要 RuleScope

真实业务规则通常散落在文档、表格、代码和人的经验里。单条规则看起来都合理，组合后却可能产生意外结果：

```text
未成年人禁止高额订单
VIP 用户的大额订单自动放行
```

当一个 17 岁 VIP 用户提交大额订单时，两条规则会同时命中并给出相反结论。普通单元测试只有提前想到这个组合才能发现它；RuleScope 会从 `age = 18`、`amount = 1000` 等边界自动构造候选输入，并输出具体反例。

## 立即体验

### 浏览器工作台

项目不需要 Node.js 依赖，也不向服务器上传规则：

```bash
python -m http.server 4173 --directory dist
```

打开 <http://127.0.0.1:4173/>。页面默认载入电商结算示例，可以：

1. 编辑 RuleScope DSL；
2. 点击“执行取证”或按 `Ctrl/Command + Enter`；
3. 查看冲突、覆盖率和候选路径数；
4. 点击问题查看最小反例与命中链路；
5. 切换到“决策轨迹”，输入任意业务数据；
6. 复制 Markdown 分析报告。

### MoonBit CLI

```bash
moon run cmd/rulescope -- checkout
moon run cmd/rulescope -- expense
moon run cmd/rulescope -- content
moon run cmd/rulescope -- insurance
moon run cmd/rulescope -- diff
```

典型输出：

```text
RuleScope report: Checkout policy
cases=972 coverage=87% issues=3
1. [RS1001] Equal-priority rules disagree on decision
   Minors cannot place high-value orders emits "deny" while
   VIP orders receive fast approval emits "allow".
   example {age: 0, tier: "vip", region: "cn", amount: 1000, digital: false}
```

## DSL 示例

```text
policy "电商结算策略"

field age: int 0..100
field tier: enum [standard, plus, vip]
field amount: int 0..5000

output decision: enum [allow, deny, review]

rule "未成年人禁止高额订单" priority 100
  when age < 18 and amount >= 1000
  then decision = deny

rule "VIP 订单快速放行" priority 100
  when tier = vip and amount >= 500
  then decision = allow
```

当前稳定 DSL 支持：

| 能力 | 支持范围 |
| --- | --- |
| 输入类型 | `int min..max`、`bool`、`enum [...]` |
| 输出类型 | 整数、布尔、枚举 |
| 比较运算 | `=`、`!=`、`<`、`<=`、`>`、`>=` |
| 条件组合 | `and` 合取 |
| 决策机制 | 数字优先级，高优先级优先 |
| 多输出 | 同一规则可以写入多个输出 |
| 注释 | `#` 或 `//` 开头的行 |

第一版刻意不支持任意脚本、网络请求和副作用。有限的值域和纯规则语义使结果可重复、可测试、可解释。

## 检测规则

| 代码 | 问题 | 严重性 |
| --- | --- | --- |
| `RS1001` | 同优先级规则对同一输出给出不同值 | Critical |
| `RS2001` | 规则在候选域内不可达 | Warning |
| `RS2002` | 规则可以命中但永远无法决定输出 | Warning |
| `RS3001` | 输出存在未覆盖输入 | Warning / Information |
| `RS40xx` | 字段或规则声明无效 | Warning |
| `RS5001` | 规则内含重复条件 | Information |
| `RS5002` | 两条规则的条件、动作和优先级相同 | Information |

## 分析方法

RuleScope 使用“边界候选域”而不是枚举每一个整数：

1. 对布尔和枚举字段，使用全部合法值。
2. 对整数字段，加入最小值、最大值和中点。
3. 对每个规则阈值 `n`，加入 `n - 1`、`n`、`n + 1`。
4. 对各字段候选值做笛卡尔积，并服从可配置的路径预算。
5. 对每条候选路径执行全部规则，再计算冲突、胜出次数和覆盖情况。

这种方法不是通用 SMT 求解器，也不声称证明任意程序正确。它针对常见的决策表、审批、资格、折扣和访问控制规则，在可控成本内覆盖最容易出错的边界。

## 行为差异

`diff_policies` 使用两个版本共同的边界候选域运行规则，并把变化分类为：

- 新增决策；
- 删除决策；
- 决策值变化；
- 决策值相同但胜出规则变化。

这比文本 diff 更贴近业务影响。例如把成年线从 18 调整到 16，RuleScope 会直接报告哪些年龄输入由 `deny` 变为 `allow` 或 `review`。

## MoonBit API

```moonbit nocheck
let policy = checkout_policy()
let report = analyze(policy)
println(report.render_text())

let input = InputCase::empty()
  .with_binding("age", IntValue(17))
  .with_binding("tier", TextValue("vip"))
  .with_binding("amount", IntValue(1200))

let evaluation = evaluate_policy(policy, input)
let trace = trace_policy(policy, input)
```

主要公开类型：

- `Value`、`FieldKind`、`CompareOp`；
- `Field`、`Predicate`、`Action`、`Rule`、`Policy`；
- `InputCase`、`Evaluation`、`OutputDecision`；
- `Issue`、`RuleCoverage`、`AnalysisReport`；
- `BehaviorChangeRecord`、`BehaviorDiff`。

## 开发与验证

```bash
moon check --target js --deny-warn
moon test --target js
moon run cmd/rulescope --target js -- checkout
moon build --target js --release
```

更新浏览器使用的 MoonBit 产物：

```powershell
./scripts/build-web.ps1
```

或者在 Linux/macOS 上：

```bash
./scripts/build-web.sh
```

统计手写源码行数（自动排除 `_build` 和生成产物）：

```powershell
./scripts/count-source.ps1
```

项目当前有超过 5,000 行手写 MoonBit、JavaScript、CSS 和 HTML 源码；生成目录不计入该数字。

## 目录结构

```text
RuleScope/
├── analyzer.mbt              # 诊断规则和报告聚合
├── diff.mbt                  # 版本行为差异
├── domain.mbt                # 边界候选域与路径枚举
├── evaluator.mbt             # 条件、规则和优先级执行
├── fixtures.mbt              # 四个业务示例与测试策略
├── model.mbt                 # 公共领域模型
├── value.mbt                 # 值类型、比较和字段类型
├── rulescope_wbtest.mbt      # MoonBit 测试
├── cmd/rulescope/            # CLI
├── web/core/                 # JavaScript 外部库导出层
├── dist/                     # 可直接部署的浏览器工作台
├── docs/                     # 架构、申报与演示文档
└── scripts/                  # 构建和验收脚本
```

## 隐私与安全

- 浏览器工作台不发送网络请求；
- 所有规则与反例只存在于当前页面内存；
- DSL 不执行用户提供的 JavaScript；
- 候选路径数量有上限，避免组合爆炸冻结页面；
- 规则分析是确定性的，同一输入得到相同报告。

## 项目边界

RuleScope 不是法律意见、合规认证或通用形式化验证器。它发现的是声明规则在给定字段域和边界候选中的确定性问题。上线前仍应由业务负责人确认规则含义，并配合真实数据回放和领域测试。

## 许可证

Apache-2.0。详见 [LICENSE](./LICENSE)。
