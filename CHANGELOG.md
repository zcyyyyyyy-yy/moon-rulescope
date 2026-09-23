# Changelog

## Unreleased

- Added counterfactual rule-impact analysis with reproducible examples.
- Added configurable strict and balanced quality gates plus a 0-100 risk score.
- Added versioned `rulescope.report/v1` JSON output for CI and dashboards.
- Added CLI commands for impact analysis, quality gates, and JSON reports.
- Added workbench gate status, risk score, impacted-path counts, and JSON export.
- CI now enforces a clean reference policy and uploads an analysis artifact.

## 0.1.0 — 2026-09-20

- Added MoonBit policy model for integer, boolean, and enumeration fields.
- Added deterministic predicate and priority evaluator with multiple outputs.
- Added boundary candidate extraction and bounded Cartesian exploration.
- Added conflict, unreachable, shadow, coverage, declaration, redundant predicate, and duplicate rule diagnostics.
- Added minimal counterexamples and decision traces.
- Added semantic behavior diff between policy versions.
- Added checkout, expense, content access, and insurance examples.
- Added CLI and JavaScript foreign-library exports.
- Added responsive local-first browser workbench.
- Added 45 MoonBit regression tests and strict CI.
