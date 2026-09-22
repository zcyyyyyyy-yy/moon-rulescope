# Contributing

Thanks for improving RuleScope. A change is ready for review when it preserves deterministic output, includes tests for semantic behavior, and passes the strict quality gate.

## Local checks

```bash
moon check --target js --deny-warn
moon test --target js
moon fmt
moon info
```

When the public interface changes, commit the regenerated `.mbti` file. When the browser core changes, rebuild the release artifact with `scripts/build-web.sh` or `scripts/build-web.ps1`.

## Issue design

Every new analyzer issue must define:

- a stable `RSxxxx` code;
- severity and issue kind;
- a concise title and causal description;
- implicated rule identifiers;
- a counterexample when one exists;
- a concrete recommendation;
- positive and negative tests.

## Compatibility

Avoid changing existing issue codes or public field semantics in a patch release. Add new variants exhaustively and update renderers, docs, CLI output, browser labels, and tests together.

## Commit messages

Use a short conventional prefix such as `feat:`, `fix:`, `docs:`, `test:`, or `refactor:`. Keep each commit focused on one reviewable behavior or documentation improvement.
