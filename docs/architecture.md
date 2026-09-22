# Architecture

## Design principles

RuleScope is built around five constraints:

1. **Deterministic:** the same policy and input always yield the same result.
2. **Explainable:** every issue includes the rules and input that reproduce it.
3. **Bounded:** exploration respects a hard case budget.
4. **Portable:** the core has no network, filesystem, clock, or random dependency.
5. **Embeddable:** consumers may use the MoonBit API, CLI, generated JS module, or browser workbench.

## Data flow

```text
Policy
  │
  ├── declaration validation ───────────────┐
  │                                         │
  └── input fields + predicate thresholds   │
                  │                         │
                  ▼                         │
         CandidateDomain[]                  │
                  │                         │
                  ▼                         │
            InputCase[]                     │
                  │                         │
                  ▼                         │
             Evaluation[]                   │
          ┌───────┼─────────┐               │
          ▼       ▼         ▼               │
      conflict  coverage  precedence        │
          └───────┼─────────┘               │
                  ▼                         │
                Issue[] ◀───────────────────┘
                  │
                  ▼
          AnalysisReport
```

## Core modules

### `value.mbt`

Defines the scalar algebra and field domains. Comparisons are total: incompatible types evaluate to false instead of throwing. Domain validation happens separately so malformed policies still produce useful diagnostics.

### `model.mbt`

Defines immutable policy declarations, concrete input bindings, evaluation results, issues, evidence, coverage rows, and aggregate reports. Bindings use ordered arrays rather than hash maps to keep counterexamples stable across targets.

### `domain.mbt`

Extracts values referenced by predicates. Integer candidates consist of field endpoints, optional midpoint, and threshold neighbors. Candidate domains are expanded into a deterministic Cartesian product until the configured budget is reached.

### `evaluator.mbt`

Evaluates every predicate and rule. Each output is resolved independently. Higher priority wins; source order is the deterministic tie-breaker for producing an evaluation, while the analyzer still reports conflicting equal-priority values.

### `analyzer.mbt`

Runs declaration diagnostics, evaluations, pairwise conflict discovery, coverage accounting, unreachable/shadow checks, gaps, duplicate rules, and redundant predicates. Duplicate conflict pairs are suppressed while retaining the earliest witness.

### `diff.mbt`

Merges candidate domains from two versions, executes both policies on the same inputs, and reports semantic changes. Textual refactors with identical behavior produce no change record.

## Trust boundaries

The core does not execute arbitrary code. A policy can only declare fields, predicates, priorities, and assignments. The browser parser creates the same semantic model used by the MoonBit fixtures; the generated MoonBit module is loaded separately and performs a startup self-check.

The browser workbench is intentionally local-only. It has no `fetch`, WebSocket, analytics, cookie, storage, or account dependency. Clipboard access occurs only after the user presses a copy button.

## Complexity

Let `d_i` be the candidate count of input field `i`, `C` the configured case limit, `R` the rule count, `P` the maximum predicate count, and `A` the maximum action count.

- Candidate generation: `O(R × P)`.
- Enumeration: `O(min(product(d_i), C))`.
- Evaluation: `O(C × R × (P + A))`.
- Conflict scan: worst-case `O(C × R² × A²)`.
- Coverage: `O(C × R)`.

The case budget protects against domain explosion. The first release targets tens to low hundreds of rules, where exhaustive boundary analysis remains interactive.

## Extension points

- New scalar types implement domain membership, rendering, and comparison.
- New predicate forms must provide candidate-boundary extraction and evaluation.
- New issue detectors consume policies, domains, or evaluations and append deterministic issues.
- Alternative frontends consume the public MoonBit API or the foreign-library exports.

