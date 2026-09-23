function _M0TP29rulescope9rulescope17ExplorationConfig(param0, param1, param2) {
  this.maximum_cases = param0;
  this.include_midpoints = param1;
  this.include_neighbor_values = param2;
}
function _M0DTP29rulescope9rulescope9FieldKind7Integer(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP29rulescope9rulescope9FieldKind7Integer.prototype.$tag = 0;
function _M0DTP29rulescope9rulescope9FieldKind7Boolean() {}
_M0DTP29rulescope9rulescope9FieldKind7Boolean.prototype.$tag = 1;
const _M0DTP29rulescope9rulescope9FieldKind7Boolean__ = new _M0DTP29rulescope9rulescope9FieldKind7Boolean();
function _M0DTP29rulescope9rulescope9FieldKind11Enumeration(param0) {
  this._0 = param0;
}
_M0DTP29rulescope9rulescope9FieldKind11Enumeration.prototype.$tag = 2;
function _M0DTP29rulescope9rulescope5Value8IntValue(param0) {
  this._0 = param0;
}
_M0DTP29rulescope9rulescope5Value8IntValue.prototype.$tag = 0;
function _M0DTP29rulescope9rulescope5Value9BoolValue(param0) {
  this._0 = param0;
}
_M0DTP29rulescope9rulescope5Value9BoolValue.prototype.$tag = 1;
function _M0DTP29rulescope9rulescope5Value9TextValue(param0) {
  this._0 = param0;
}
_M0DTP29rulescope9rulescope5Value9TextValue.prototype.$tag = 2;
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
const _M0MPB7JSArray4copy = (arr) => arr.slice(0);
function _M0TP29rulescope9rulescope5Field(param0, param1, param2, param3) {
  this.name = param0;
  this.kind = param1;
  this.role = param2;
  this.source_line = param3;
}
function _M0TP29rulescope9rulescope9Predicate(param0, param1, param2, param3) {
  this.field = param0;
  this.operator = param1;
  this.expected = param2;
  this.source_line = param3;
}
function _M0TP29rulescope9rulescope6Action(param0, param1, param2) {
  this.output = param0;
  this.value = param1;
  this.source_line = param2;
}
function _M0TP29rulescope9rulescope4Rule(param0, param1, param2, param3, param4, param5, param6, param7) {
  this.id = param0;
  this.name = param1;
  this.priority = param2;
  this.predicates = param3;
  this.actions = param4;
  this.source_line = param5;
  this.tags = param6;
  this.enabled = param7;
}
function _M0TP29rulescope9rulescope6Policy(param0, param1, param2, param3, param4) {
  this.name = param0;
  this.version = param1;
  this.fields = param2;
  this.rules = param3;
  this.description = param4;
}
function _M0TP29rulescope9rulescope9InputCase(param0) {
  this.bindings = param0;
}
function _M0TP29rulescope9rulescope7Binding(param0, param1) {
  this.field = param0;
  this.value = param1;
}
function _M0TP29rulescope9rulescope20BehaviorChangeRecord(param0, param1, param2, param3, param4, param5, param6) {
  this.input = param0;
  this.output = param1;
  this.before = param2;
  this.after = param3;
  this.before_rule = param4;
  this.after_rule = param5;
  this.kind = param6;
}
function _M0TP29rulescope9rulescope17DecisionCandidate(param0, param1, param2, param3, param4) {
  this.output = param0;
  this.value = param1;
  this.priority = param2;
  this.rule_id = param3;
  this.rule_order = param4;
}
function _M0TP29rulescope9rulescope9RuleMatch(param0, param1, param2, param3) {
  this.rule_id = param0;
  this.rule_name = param1;
  this.matched = param2;
  this.failed_predicates = param3;
}
function _M0TP29rulescope9rulescope14OutputDecision(param0, param1, param2, param3) {
  this.output = param0;
  this.value = param1;
  this.priority = param2;
  this.rule_id = param3;
}
function _M0TP29rulescope9rulescope10Evaluation(param0, param1, param2, param3) {
  this.input = param0;
  this.matches = param1;
  this.decisions = param2;
  this.matched_rule_ids = param3;
}
function _M0TP29rulescope9rulescope15CandidateDomain(param0, param1) {
  this.field = param0;
  this.values = param1;
}
function _M0TP29rulescope9rulescope12BehaviorDiff(param0, param1, param2, param3, param4) {
  this.before_name = param0;
  this.after_name = param1;
  this.checked_cases = param2;
  this.changes = param3;
  this.truncated = param4;
}
function _M0TP29rulescope9rulescope12RuleCoverage(param0, param1, param2, param3) {
  this.rule_id = param0;
  this.match_count = param1;
  this.win_count = param2;
  this.total_cases = param3;
}
function _M0TP29rulescope9rulescope13AnalysisStats(param0, param1, param2, param3, param4, param5) {
  this.candidate_cases = param0;
  this.covered_cases = param1;
  this.uncovered_cases = param2;
  this.conflict_count = param3;
  this.warning_count = param4;
  this.information_count = param5;
}
function _M0TP29rulescope9rulescope5Issue(param0, param1, param2, param3, param4, param5, param6, param7, param8) {
  this.code = param0;
  this.severity = param1;
  this.kind = param2;
  this.title = param3;
  this.description = param4;
  this.rule_ids = param5;
  this.counterexample = param6;
  this.evidence = param7;
  this.recommendation = param8;
}
function _M0TP29rulescope9rulescope12EvidenceStep(param0, param1, param2) {
  this.rule_id = param0;
  this.title = param1;
  this.detail = param2;
}
function _M0TP29rulescope9rulescope14AnalysisReport(param0, param1, param2, param3, param4) {
  this.policy_name = param0;
  this.issues = param1;
  this.coverage = param2;
  this.evaluations = param3;
  this.stats = param4;
}
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0MP29rulescope9rulescope17ExplorationConfig8standardN6recordS1677 = new _M0TP29rulescope9rulescope17ExplorationConfig(12000, true, true);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1700 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 50000);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1701 = new _M0DTP29rulescope9rulescope5Value9BoolValue(false);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1702 = new _M0DTP29rulescope9rulescope5Value8IntValue(500);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1703 = new _M0DTP29rulescope9rulescope5Value9TextValue("reject");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1704 = new _M0DTP29rulescope9rulescope5Value9TextValue("director");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1705 = new _M0DTP29rulescope9rulescope5Value8IntValue(3000);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1706 = new _M0DTP29rulescope9rulescope5Value9TextValue("approve");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1707 = new _M0DTP29rulescope9rulescope5Value9TextValue("equipment");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1708 = new _M0DTP29rulescope9rulescope5Value8IntValue(1000);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1709 = new _M0DTP29rulescope9rulescope5Value9TextValue("review");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1710 = new _M0DTP29rulescope9rulescope5Value9TextValue("manager");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1711 = new _M0DTP29rulescope9rulescope5Value9TextValue("travel");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1712 = new _M0DTP29rulescope9rulescope5Value8IntValue(5000);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1713 = new _M0DTP29rulescope9rulescope5Value9TextValue("approve");
const _M0FP29rulescope9rulescope15expense__policyN6constrS1714 = new _M0DTP29rulescope9rulescope5Value8IntValue(800);
const _M0FP29rulescope9rulescope15expense__policyN6constrS1715 = new _M0DTP29rulescope9rulescope5Value9TextValue("approve");
const _M0FP29rulescope9rulescope18clean__age__policyN6constrS1745 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 120);
const _M0FP29rulescope9rulescope18clean__age__policyN6constrS1746 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope18clean__age__policyN6constrS1747 = new _M0DTP29rulescope9rulescope5Value9TextValue("deny");
const _M0FP29rulescope9rulescope18clean__age__policyN6constrS1748 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope18clean__age__policyN6constrS1749 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope15content__policyN6constrS1716 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 100);
const _M0FP29rulescope9rulescope15content__policyN6constrS1717 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope15content__policyN6constrS1718 = new _M0DTP29rulescope9rulescope5Value9TextValue("adult");
const _M0FP29rulescope9rulescope15content__policyN6constrS1719 = new _M0DTP29rulescope9rulescope5Value9TextValue("deny");
const _M0FP29rulescope9rulescope15content__policyN6constrS1720 = new _M0DTP29rulescope9rulescope5Value9TextValue("premium");
const _M0FP29rulescope9rulescope15content__policyN6constrS1721 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope15content__policyN6constrS1722 = new _M0DTP29rulescope9rulescope5Value9TextValue("eu");
const _M0FP29rulescope9rulescope15content__policyN6constrS1723 = new _M0DTP29rulescope9rulescope5Value9TextValue("guest");
const _M0FP29rulescope9rulescope15content__policyN6constrS1724 = new _M0DTP29rulescope9rulescope5Value9TextValue("verify");
const _M0FP29rulescope9rulescope15content__policyN6constrS1725 = new _M0DTP29rulescope9rulescope5Value9TextValue("general");
const _M0FP29rulescope9rulescope15content__policyN6constrS1726 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope15content__policyN6constrS1727 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope15content__policyN6constrS1728 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1680 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 100);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1681 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 5000);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1682 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 30);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1683 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1684 = new _M0DTP29rulescope9rulescope5Value8IntValue(1000);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1685 = new _M0DTP29rulescope9rulescope5Value9TextValue("deny");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1686 = new _M0DTP29rulescope9rulescope5Value9TextValue("vip");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1687 = new _M0DTP29rulescope9rulescope5Value8IntValue(500);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1688 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1689 = new _M0DTP29rulescope9rulescope5Value9TextValue("eu");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1690 = new _M0DTP29rulescope9rulescope5Value9BoolValue(true);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1691 = new _M0DTP29rulescope9rulescope5Value9TextValue("review");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1692 = new _M0DTP29rulescope9rulescope5Value9TextValue("vip");
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1693 = new _M0DTP29rulescope9rulescope5Value8IntValue(1000);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1694 = new _M0DTP29rulescope9rulescope5Value8IntValue(20);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1695 = new _M0DTP29rulescope9rulescope5Value8IntValue(1000);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1696 = new _M0DTP29rulescope9rulescope5Value8IntValue(10);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1697 = new _M0DTP29rulescope9rulescope5Value8IntValue(1000);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1698 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope16checkout__policyN6constrS1699 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
const _M0FP29rulescope9rulescope21candidates__for__kindN6constrS1675 = new _M0DTP29rulescope9rulescope5Value9BoolValue(false);
const _M0FP29rulescope9rulescope21candidates__for__kindN6constrS1676 = new _M0DTP29rulescope9rulescope5Value9BoolValue(true);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1729 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 100);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1730 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 100000);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1731 = new _M0DTP29rulescope9rulescope5Value9BoolValue(false);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1732 = new _M0DTP29rulescope9rulescope5Value9TextValue("manual");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1733 = new _M0DTP29rulescope9rulescope5Value9TextValue("major");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1734 = new _M0DTP29rulescope9rulescope5Value8IntValue(20000);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1735 = new _M0DTP29rulescope9rulescope5Value9TextValue("reject");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1736 = new _M0DTP29rulescope9rulescope5Value8IntValue(70);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1737 = new _M0DTP29rulescope9rulescope5Value8IntValue(10000);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1738 = new _M0DTP29rulescope9rulescope5Value9TextValue("manual");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1739 = new _M0DTP29rulescope9rulescope5Value8IntValue(5000);
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1740 = new _M0DTP29rulescope9rulescope5Value9TextValue("accept");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1741 = new _M0DTP29rulescope9rulescope5Value9TextValue("major");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1742 = new _M0DTP29rulescope9rulescope5Value9TextValue("high");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1743 = new _M0DTP29rulescope9rulescope5Value9TextValue("clear");
const _M0FP29rulescope9rulescope17insurance__policyN6constrS1744 = new _M0DTP29rulescope9rulescope5Value9TextValue("low");
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1770 = new _M0DTP29rulescope9rulescope9FieldKind7Integer(0, 120);
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1771 = new _M0DTP29rulescope9rulescope5Value8IntValue(16);
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1772 = new _M0DTP29rulescope9rulescope5Value9TextValue("deny");
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1773 = new _M0DTP29rulescope9rulescope5Value8IntValue(16);
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1774 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1775 = new _M0DTP29rulescope9rulescope5Value9TextValue("review");
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1776 = new _M0DTP29rulescope9rulescope5Value8IntValue(18);
const _M0FP29rulescope9rulescope15age__policy__v2N6constrS1777 = new _M0DTP29rulescope9rulescope5Value9TextValue("allow");
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope5ValueE(x, y) {
  return !_M0IP29rulescope9rulescope5ValuePB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope9FieldRoleE(x, y) {
  return !_M0IP29rulescope9rulescope9FieldRolePB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB7Compare6op__ltGsE(x, y) {
  return _M0IPC16string6StringPB7Compare7compare(x, y) < 0;
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, self);
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0IPC16string6StringPB7Compare7compare(self, other) {
  const len = self.length;
  const _bind = $compare_int(len, other.length);
  if (_bind === 0) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.charCodeAt(i);
        const _p$2 = other.charCodeAt(i);
        const order = $compare_int(_p, _p$2);
        if (order !== 0) {
          return order;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return 0;
  } else {
    return _bind;
  }
}
function _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(self) {
  return _M0MPB7JSArray4copy(self);
}
function _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array3setGRP29rulescope9rulescope15CandidateDomainE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0IPC15array5ArrayPB2Eq5equalGRP29rulescope9rulescope9PredicateE(self, other) {
  const self_len = self.length;
  const other_len = other.length;
  if (self_len === other_len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < self_len) {
        if (_M0IP29rulescope9rulescope9PredicatePB2Eq5equal(self[i], other[i])) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
function _M0IPC15array5ArrayPB2Eq5equalGRP29rulescope9rulescope6ActionE(self, other) {
  const self_len = self.length;
  const other_len = other.length;
  if (self_len === other_len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < self_len) {
        if (_M0IP29rulescope9rulescope6ActionPB2Eq5equal(self[i], other[i])) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
function _M0IP29rulescope9rulescope9PredicatePB2Eq5equal(_x_667, _x_668) {
  return _x_667.field === _x_668.field && _M0IP29rulescope9rulescope9CompareOpPB2Eq5equal(_x_667.operator, _x_668.operator) && _M0IP29rulescope9rulescope5ValuePB2Eq5equal(_x_667.expected, _x_668.expected) && _x_667.source_line === _x_668.source_line;
}
function _M0IP29rulescope9rulescope5ValuePB2Eq5equal(_x_625, _x_626) {
  switch (_x_625.$tag) {
    case 0: {
      const _IntValue = _x_625;
      const _$42$x0_627 = _IntValue._0;
      if (_x_626.$tag === 0) {
        const _IntValue$2 = _x_626;
        const _$42$y0_628 = _IntValue$2._0;
        return _$42$x0_627 === _$42$y0_628;
      } else {
        return false;
      }
    }
    case 1: {
      const _BoolValue = _x_625;
      const _$42$x0_629 = _BoolValue._0;
      if (_x_626.$tag === 1) {
        const _BoolValue$2 = _x_626;
        const _$42$y0_630 = _BoolValue$2._0;
        return _$42$x0_629 === _$42$y0_630;
      } else {
        return false;
      }
    }
    default: {
      const _TextValue = _x_625;
      const _$42$x0_631 = _TextValue._0;
      if (_x_626.$tag === 2) {
        const _TextValue$2 = _x_626;
        const _$42$y0_632 = _TextValue$2._0;
        return _$42$x0_631 === _$42$y0_632;
      } else {
        return false;
      }
    }
  }
}
function _M0IP29rulescope9rulescope6ActionPB2Eq5equal(_x_595, _x_596) {
  return _x_595.output === _x_596.output && _M0IP29rulescope9rulescope5ValuePB2Eq5equal(_x_595.value, _x_596.value) && _x_595.source_line === _x_596.source_line;
}
function _M0IP29rulescope9rulescope9FieldRolePB2Eq5equal(_x_571, _x_572) {
  if (_x_571 === 0) {
    if (_x_572 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_572 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
function _M0IP29rulescope9rulescope9CompareOpPB2Eq5equal(_x_565, _x_566) {
  switch (_x_565) {
    case 0: {
      if (_x_566 === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_566 === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_566 === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_566 === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_566 === 4) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      if (_x_566 === 5) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function _M0MP29rulescope9rulescope5Value6render(self) {
  switch (self.$tag) {
    case 0: {
      const _IntValue = self;
      const _value = _IntValue._0;
      return _M0MPC13int3Int18to__string_2einner(_value, 10);
    }
    case 1: {
      const _BoolValue = self;
      const _x = _BoolValue._0;
      if (_x === true) {
        return "true";
      } else {
        return "false";
      }
    }
    default: {
      const _TextValue = self;
      return _TextValue._0;
    }
  }
}
function _M0MP29rulescope9rulescope5Value14render__quoted(self) {
  if (self.$tag === 2) {
    const _TextValue = self;
    const _value = _TextValue._0;
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(2);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\"");
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, _value);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\"");
    return _string_builder.val;
  } else {
    return _M0MP29rulescope9rulescope5Value6render(self);
  }
}
function _M0FP29rulescope9rulescope13compare__bool(actual, operator, expected) {
  switch (operator) {
    case 0: {
      return actual === expected;
    }
    case 1: {
      return !(actual === expected);
    }
    default: {
      return false;
    }
  }
}
function _M0FP29rulescope9rulescope12compare__int(actual, operator, expected) {
  switch (operator) {
    case 0: {
      return actual === expected;
    }
    case 1: {
      return actual !== expected;
    }
    case 2: {
      return actual < expected;
    }
    case 3: {
      return actual <= expected;
    }
    case 4: {
      return actual > expected;
    }
    default: {
      return actual >= expected;
    }
  }
}
function _M0FP29rulescope9rulescope13compare__text(actual, operator, expected) {
  switch (operator) {
    case 0: {
      return actual === expected;
    }
    case 1: {
      return !(actual === expected);
    }
    default: {
      return false;
    }
  }
}
function _M0MP29rulescope9rulescope5Value7compare(self, operator, expected) {
  switch (self.$tag) {
    case 0: {
      const _IntValue = self;
      const _actual = _IntValue._0;
      if (expected.$tag === 0) {
        const _IntValue$2 = expected;
        const _target = _IntValue$2._0;
        return _M0FP29rulescope9rulescope12compare__int(_actual, operator, _target);
      } else {
        return false;
      }
    }
    case 1: {
      const _BoolValue = self;
      const _actual$2 = _BoolValue._0;
      if (expected.$tag === 1) {
        const _BoolValue$2 = expected;
        const _target = _BoolValue$2._0;
        return _M0FP29rulescope9rulescope13compare__bool(_actual$2, operator, _target);
      } else {
        return false;
      }
    }
    default: {
      const _TextValue = self;
      const _actual$3 = _TextValue._0;
      if (expected.$tag === 2) {
        const _TextValue$2 = expected;
        const _target = _TextValue$2._0;
        return _M0FP29rulescope9rulescope13compare__text(_actual$3, operator, _target);
      } else {
        return false;
      }
    }
  }
}
function _M0MP29rulescope9rulescope9CompareOp6render(self) {
  switch (self) {
    case 0: {
      return "=";
    }
    case 1: {
      return "!=";
    }
    case 2: {
      return "<";
    }
    case 3: {
      return "<=";
    }
    case 4: {
      return ">";
    }
    default: {
      return ">=";
    }
  }
}
function _M0MP29rulescope9rulescope9CompareOp12is__ordering(self) {
  switch (self) {
    case 2: {
      return true;
    }
    case 3: {
      return true;
    }
    case 4: {
      return true;
    }
    case 5: {
      return true;
    }
    default: {
      return false;
    }
  }
}
function _M0MP29rulescope9rulescope9FieldKind4name(self) {
  switch (self.$tag) {
    case 0: {
      return "int";
    }
    case 1: {
      return "bool";
    }
    default: {
      return "enum";
    }
  }
}
function _M0FP29rulescope9rulescope23string__array__contains(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (value === candidate) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MP29rulescope9rulescope9FieldKind8contains(self, value) {
  switch (self.$tag) {
    case 0: {
      const _Integer = self;
      const _minimum = _Integer._0;
      const _maximum = _Integer._1;
      if (value.$tag === 0) {
        const _IntValue = value;
        const _candidate = _IntValue._0;
        return _candidate >= _minimum && _candidate <= _maximum;
      } else {
        return false;
      }
    }
    case 1: {
      if (value.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      const _Enumeration = self;
      const _values = _Enumeration._0;
      if (value.$tag === 2) {
        const _TextValue = value;
        const _candidate = _TextValue._0;
        return _M0FP29rulescope9rulescope23string__array__contains(_values, _candidate);
      } else {
        return false;
      }
    }
  }
}
function _M0FP29rulescope9rulescope12input__field(name, kind, line) {
  return new _M0TP29rulescope9rulescope5Field(name, kind, 0, line);
}
function _M0FP29rulescope9rulescope13output__field(name, kind, line) {
  return new _M0TP29rulescope9rulescope5Field(name, kind, 1, line);
}
function _M0FP29rulescope9rulescope9predicate(field, operator, expected, line) {
  return new _M0TP29rulescope9rulescope9Predicate(field, operator, expected, line);
}
function _M0FP29rulescope9rulescope6action(output, value, line) {
  return new _M0TP29rulescope9rulescope6Action(output, value, line);
}
function _M0FP29rulescope9rulescope4rule(id, name, priority, predicates, actions) {
  return new _M0TP29rulescope9rulescope4Rule(id, name, priority, predicates, actions, 0, [], true);
}
function _M0FP29rulescope9rulescope6policy(name, fields, rules) {
  return new _M0TP29rulescope9rulescope6Policy(name, "1", fields, rules, "");
}
function _M0MP29rulescope9rulescope6Policy13input__fields(self) {
  const _p = self.fields;
  const _p$2 = [];
  const _p$3 = _p.length;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$3) {
      const _p$5 = _p[_p$4];
      if (_M0IP29rulescope9rulescope9FieldRolePB2Eq5equal(_p$5.role, 0)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(_p$2, _p$5);
      }
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _p$2;
}
function _M0MP29rulescope9rulescope6Policy14output__fields(self) {
  const _p = self.fields;
  const _p$2 = [];
  const _p$3 = _p.length;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$3) {
      const _p$5 = _p[_p$4];
      if (_M0IP29rulescope9rulescope9FieldRolePB2Eq5equal(_p$5.role, 1)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(_p$2, _p$5);
      }
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _p$2;
}
function _M0MP29rulescope9rulescope6Policy11find__field(self, name) {
  const _bind = self.fields;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const field = _bind[_];
      if (field.name === name) {
        return field;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0MP29rulescope9rulescope6Policy10find__rule(self, id) {
  const _bind = self.rules;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const item = _bind[_];
      if (item.id === id) {
        return item;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0MP29rulescope9rulescope9InputCase5empty() {
  return new _M0TP29rulescope9rulescope9InputCase([]);
}
function _M0MP29rulescope9rulescope9InputCase3get(self, field) {
  const _bind = self.bindings;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const binding = _bind[_];
      if (binding.field === field) {
        return binding.value;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0MP29rulescope9rulescope9InputCase13with__binding(self, field, value) {
  const result = _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(self.bindings);
  let replaced = false;
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < result.length) {
      if (_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index).field === field) {
        _M0MPC15array5Array3setGRP29rulescope9rulescope15CandidateDomainE(result, index, new _M0TP29rulescope9rulescope7Binding(field, value));
        replaced = true;
      }
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (!replaced) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, new _M0TP29rulescope9rulescope7Binding(field, value));
  }
  return new _M0TP29rulescope9rulescope9InputCase(result);
}
function _M0MP29rulescope9rulescope9InputCase6render(self) {
  let rendered = "{";
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < self.bindings.length) {
      if (index > 0) {
        rendered = `${rendered}, `;
      }
      const binding = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(self.bindings, index);
      rendered = `${rendered}${binding.field}: ${_M0MP29rulescope9rulescope5Value14render__quoted(binding.value)}`;
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${rendered}}`;
}
function _M0FP29rulescope9rulescope22diff__contains__string(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (value === candidate) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MP29rulescope9rulescope10Evaluation13decision__for(self, output) {
  const _bind = self.decisions;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const decision = _bind[_];
      if (decision.output === output) {
        return decision;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FP29rulescope9rulescope21append__case__changes(before, after, changes, maximum_changes) {
  const outputs = [];
  const _bind = before.decisions;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const decision = _bind[_];
      if (!_M0FP29rulescope9rulescope22diff__contains__string(outputs, decision.output)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(outputs, decision.output);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$3 = after.decisions;
  const _bind$4 = _bind$3.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$4) {
      const decision = _bind$3[_];
      if (!_M0FP29rulescope9rulescope22diff__contains__string(outputs, decision.output)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(outputs, decision.output);
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$5 = outputs.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$5) {
      const output = outputs[_];
      if (changes.length >= maximum_changes) {
        return undefined;
      }
      const left = _M0MP29rulescope9rulescope10Evaluation13decision__for(before, output);
      const right = _M0MP29rulescope9rulescope10Evaluation13decision__for(after, output);
      if (left === undefined) {
        if (right === undefined) {
        } else {
          const _Some = right;
          const _next = _Some;
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(changes, new _M0TP29rulescope9rulescope20BehaviorChangeRecord(before.input, output, undefined, _next.value, undefined, _next.rule_id, 0));
        }
      } else {
        const _Some = left;
        const _previous = _Some;
        if (right === undefined) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(changes, new _M0TP29rulescope9rulescope20BehaviorChangeRecord(before.input, output, _previous.value, undefined, _previous.rule_id, undefined, 1));
        } else {
          const _Some$2 = right;
          const _next = _Some$2;
          if (_M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope5ValueE(_previous.value, _next.value)) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(changes, new _M0TP29rulescope9rulescope20BehaviorChangeRecord(before.input, output, _previous.value, _next.value, _previous.rule_id, _next.rule_id, 2));
          } else {
            const _p = _previous.rule_id;
            const _p$2 = _next.rule_id;
            if (!(_p === _p$2)) {
              _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(changes, new _M0TP29rulescope9rulescope20BehaviorChangeRecord(before.input, output, _previous.value, _next.value, _previous.rule_id, _next.rule_id, 3));
            }
          }
        }
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP29rulescope9rulescope15enumerate__from(domains, index, current, result, maximum_cases) {
  if (result.length >= maximum_cases) {
    return undefined;
  }
  if (index >= domains.length) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, current);
    return undefined;
  }
  const domain = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(domains, index);
  const _bind = domain.values;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const value = _bind[_];
      if (result.length >= maximum_cases) {
        return undefined;
      }
      _M0FP29rulescope9rulescope15enumerate__from(domains, index + 1 | 0, _M0MP29rulescope9rulescope9InputCase13with__binding(current, domain.field, value), result, maximum_cases);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP29rulescope9rulescope16enumerate__cases(domains, maximum_cases) {
  const result = [];
  if (maximum_cases <= 0) {
    return result;
  }
  _M0FP29rulescope9rulescope15enumerate__from(domains, 0, _M0MP29rulescope9rulescope9InputCase5empty(), result, maximum_cases);
  return result;
}
function _M0FP29rulescope9rulescope18predicate__matches(item, input) {
  const _bind = _M0MP29rulescope9rulescope9InputCase3get(input, item.field);
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _actual = _Some;
    return _M0MP29rulescope9rulescope5Value7compare(_actual, item.operator, item.expected);
  }
}
function _M0FP29rulescope9rulescope13rule__matches(item, input) {
  if (!item.enabled) {
    return false;
  }
  const _bind = item.predicates;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const condition = _bind[_];
      if (!_M0FP29rulescope9rulescope18predicate__matches(condition, input)) {
        return false;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FP29rulescope9rulescope19collect__candidates(policy, input) {
  const candidates = [];
  let _tmp = 0;
  while (true) {
    const rule_order = _tmp;
    if (rule_order < policy.rules.length) {
      const item = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.rules, rule_order);
      if (_M0FP29rulescope9rulescope13rule__matches(item, input)) {
        const _bind = item.actions;
        const _bind$2 = _bind.length;
        let _tmp$2 = 0;
        while (true) {
          const _ = _tmp$2;
          if (_ < _bind$2) {
            const assignment = _bind[_];
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(candidates, new _M0TP29rulescope9rulescope17DecisionCandidate(assignment.output, assignment.value, item.priority, item.id, rule_order));
            _tmp$2 = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      _tmp = rule_order + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return candidates;
}
function _M0FP29rulescope9rulescope14evaluate__rule(item, input) {
  const failed = [];
  if (!item.enabled) {
    return new _M0TP29rulescope9rulescope9RuleMatch(item.id, item.name, false, _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(item.predicates));
  }
  const _bind = item.predicates;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const condition = _bind[_];
      if (!_M0FP29rulescope9rulescope18predicate__matches(condition, input)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(failed, condition);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP29rulescope9rulescope9RuleMatch(item.id, item.name, failed.length === 0, failed);
}
function _M0FP29rulescope9rulescope12find__winner(candidates, output) {
  let winner = undefined;
  const _bind = candidates.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const candidate = candidates[_];
      if (candidate.output === output) {
        const _bind$2 = winner;
        if (_bind$2 === undefined) {
          winner = candidate;
        } else {
          const _Some = _bind$2;
          const _current = _Some;
          if (candidate.priority > _current.priority || candidate.priority === _current.priority && candidate.rule_order < _current.rule_order) {
            winner = candidate;
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return winner;
}
function _M0FP29rulescope9rulescope16evaluate__policy(policy, input) {
  const matches = [];
  const matched_ids = [];
  const _bind = policy.rules;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const item = _bind[_];
      const result = _M0FP29rulescope9rulescope14evaluate__rule(item, input);
      if (result.matched) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(matched_ids, item.id);
      }
      _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(matches, result);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const candidates = _M0FP29rulescope9rulescope19collect__candidates(policy, input);
  const decisions = [];
  const _bind$3 = _M0MP29rulescope9rulescope6Policy14output__fields(policy);
  const _bind$4 = _bind$3.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$4) {
      const field = _bind$3[_];
      const _bind$5 = _M0FP29rulescope9rulescope12find__winner(candidates, field.name);
      if (_bind$5 === undefined) {
      } else {
        const _Some = _bind$5;
        const _winner = _Some;
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(decisions, new _M0TP29rulescope9rulescope14OutputDecision(_winner.output, _winner.value, _winner.priority, _winner.rule_id));
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP29rulescope9rulescope10Evaluation(input, matches, decisions, matched_ids);
}
function _M0FP29rulescope9rulescope15contains__value(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (_M0IP29rulescope9rulescope5ValuePB2Eq5equal(value, candidate)) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP29rulescope9rulescope12push__unique(values, candidate) {
  if (!_M0FP29rulescope9rulescope15contains__value(values, candidate)) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(values, candidate);
    return;
  } else {
    return;
  }
}
function _M0FP29rulescope9rulescope22push__bounded__integer(values, minimum, maximum, candidate) {
  if (candidate >= minimum && candidate <= maximum) {
    _M0FP29rulescope9rulescope12push__unique(values, new _M0DTP29rulescope9rulescope5Value8IntValue(candidate));
    return;
  } else {
    return;
  }
}
function _M0FP29rulescope9rulescope20integer__from__value(value) {
  switch (value.$tag) {
    case 0: {
      const _IntValue = value;
      return _IntValue._0;
    }
    case 1: {
      const _BoolValue = value;
      const _x = _BoolValue._0;
      if (_x === false) {
        return 0;
      } else {
        return 1;
      }
    }
    default: {
      return 0;
    }
  }
}
function _M0FP29rulescope9rulescope21sort__integer__values(values) {
  const result = _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(values);
  if (result.length < 2) {
    return result;
  }
  let _tmp = result.length - 1 | 0;
  while (true) {
    const upper = _tmp;
    if (upper > 0) {
      let _tmp$2 = 0;
      while (true) {
        const index = _tmp$2;
        if (index < upper) {
          if (_M0FP29rulescope9rulescope20integer__from__value(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index)) > _M0FP29rulescope9rulescope20integer__from__value(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index + 1 | 0))) {
            const temporary = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index);
            _M0MPC15array5Array3setGRP29rulescope9rulescope15CandidateDomainE(result, index, _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index + 1 | 0));
            _M0MPC15array5Array3setGRP29rulescope9rulescope15CandidateDomainE(result, index + 1 | 0, temporary);
          }
          _tmp$2 = index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = upper - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope21candidates__for__kind(kind, references, config) {
  switch (kind.$tag) {
    case 0: {
      const _Integer = kind;
      const _minimum = _Integer._0;
      const _maximum = _Integer._1;
      const values = [];
      _M0FP29rulescope9rulescope12push__unique(values, new _M0DTP29rulescope9rulescope5Value8IntValue(_minimum));
      if (config.include_midpoints) {
        _M0FP29rulescope9rulescope12push__unique(values, new _M0DTP29rulescope9rulescope5Value8IntValue(_minimum + ((_maximum - _minimum | 0) / 2 | 0) | 0));
      }
      _M0FP29rulescope9rulescope12push__unique(values, new _M0DTP29rulescope9rulescope5Value8IntValue(_maximum));
      const _bind = references.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const reference = references[_];
          if (reference.$tag === 0) {
            const _IntValue = reference;
            const _number = _IntValue._0;
            if (config.include_neighbor_values) {
              _M0FP29rulescope9rulescope22push__bounded__integer(values, _minimum, _maximum, _number - 1 | 0);
            }
            _M0FP29rulescope9rulescope22push__bounded__integer(values, _minimum, _maximum, _number);
            if (config.include_neighbor_values) {
              _M0FP29rulescope9rulescope22push__bounded__integer(values, _minimum, _maximum, _number + 1 | 0);
            }
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0FP29rulescope9rulescope21sort__integer__values(values);
    }
    case 1: {
      return [_M0FP29rulescope9rulescope21candidates__for__kindN6constrS1675, _M0FP29rulescope9rulescope21candidates__for__kindN6constrS1676];
    }
    default: {
      const _Enumeration = kind;
      const _items = _Enumeration._0;
      const _p = new Array(_items.length);
      const _p$2 = _items.length;
      let _tmp$2 = 0;
      while (true) {
        const _p$3 = _tmp$2;
        if (_p$3 < _p$2) {
          const _p$4 = _items[_p$3];
          _p[_p$3] = new _M0DTP29rulescope9rulescope5Value9TextValue(_p$4);
          _tmp$2 = _p$3 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _p;
    }
  }
}
function _M0FP29rulescope9rulescope30referenced__values__for__field(policy, name) {
  const result = [];
  const _bind = policy.rules;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const rule = _bind[_];
      const _bind$3 = rule.predicates;
      const _bind$4 = _bind$3.length;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$4) {
          const item = _bind$3[_$2];
          if (item.field === name && !_M0FP29rulescope9rulescope15contains__value(result, item.expected)) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, item.expected);
          }
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope25build__candidate__domains(policy, config) {
  const result = [];
  const _bind = _M0MP29rulescope9rulescope6Policy13input__fields(policy);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const field = _bind[_];
      const references = _M0FP29rulescope9rulescope30referenced__values__for__field(policy, field.name);
      const values = _M0FP29rulescope9rulescope21candidates__for__kind(field.kind, references, config);
      _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, new _M0TP29rulescope9rulescope15CandidateDomain(field.name, values));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope21diff__contains__value(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (_M0IP29rulescope9rulescope5ValuePB2Eq5equal(value, candidate)) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP29rulescope9rulescope15merged__domains(before, after) {
  const left = _M0FP29rulescope9rulescope25build__candidate__domains(before, _M0MP29rulescope9rulescope17ExplorationConfig8standardN6recordS1677);
  const right = _M0FP29rulescope9rulescope25build__candidate__domains(after, _M0MP29rulescope9rulescope17ExplorationConfig8standardN6recordS1677);
  const result = _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(left);
  const _bind = right.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const other = right[_];
      let found = false;
      let _tmp$2 = 0;
      while (true) {
        const index = _tmp$2;
        if (index < result.length) {
          if (_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index).field === other.field) {
            const combined = _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(result, index).values);
            const _bind$2 = other.values;
            const _bind$3 = _bind$2.length;
            let _tmp$3 = 0;
            while (true) {
              const _$2 = _tmp$3;
              if (_$2 < _bind$3) {
                const value = _bind$2[_$2];
                if (!_M0FP29rulescope9rulescope21diff__contains__value(combined, value)) {
                  _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(combined, value);
                }
                _tmp$3 = _$2 + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MPC15array5Array3setGRP29rulescope9rulescope15CandidateDomainE(result, index, new _M0TP29rulescope9rulescope15CandidateDomain(other.field, combined));
            found = true;
          }
          _tmp$2 = index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (!found) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, other);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope27diff__policies__with__limit(before, after, maximum_cases, maximum_changes) {
  const merged = _M0FP29rulescope9rulescope15merged__domains(before, after);
  const cases = _M0FP29rulescope9rulescope16enumerate__cases(merged, maximum_cases);
  const changes = [];
  let truncated = false;
  const _bind = cases.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const input = cases[_];
      if (changes.length >= maximum_changes) {
        truncated = true;
        break;
      }
      const left = _M0FP29rulescope9rulescope16evaluate__policy(before, input);
      const right = _M0FP29rulescope9rulescope16evaluate__policy(after, input);
      _M0FP29rulescope9rulescope21append__case__changes(left, right, changes, maximum_changes);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP29rulescope9rulescope12BehaviorDiff(before.name, after.name, cases.length, changes, truncated);
}
function _M0FP29rulescope9rulescope16checkout__policy() {
  const fields = [_M0FP29rulescope9rulescope12input__field("age", _M0FP29rulescope9rulescope16checkout__policyN6constrS1680, 3), _M0FP29rulescope9rulescope12input__field("tier", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["standard", "plus", "vip"]), 4), _M0FP29rulescope9rulescope12input__field("region", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["cn", "eu", "us"]), 5), _M0FP29rulescope9rulescope12input__field("amount", _M0FP29rulescope9rulescope16checkout__policyN6constrS1681, 6), _M0FP29rulescope9rulescope12input__field("digital", _M0DTP29rulescope9rulescope9FieldKind7Boolean__, 7), _M0FP29rulescope9rulescope13output__field("decision", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["allow", "deny", "review"]), 9), _M0FP29rulescope9rulescope13output__field("discount", _M0FP29rulescope9rulescope16checkout__policyN6constrS1682, 10)];
  const rules = [new _M0TP29rulescope9rulescope4Rule("R001", "Minors cannot place high-value orders", 100, [_M0FP29rulescope9rulescope9predicate("age", 2, _M0FP29rulescope9rulescope16checkout__policyN6constrS1683, 13), _M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope16checkout__policyN6constrS1684, 13)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope16checkout__policyN6constrS1685, 14)], 12, ["safety", "minor"], true), new _M0TP29rulescope9rulescope4Rule("R002", "VIP orders receive fast approval", 100, [_M0FP29rulescope9rulescope9predicate("tier", 0, _M0FP29rulescope9rulescope16checkout__policyN6constrS1686, 17), _M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope16checkout__policyN6constrS1687, 17)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope16checkout__policyN6constrS1688, 18)], 16, ["vip", "conversion"], true), new _M0TP29rulescope9rulescope4Rule("R003", "EU digital goods require review", 80, [_M0FP29rulescope9rulescope9predicate("region", 0, _M0FP29rulescope9rulescope16checkout__policyN6constrS1689, 21), _M0FP29rulescope9rulescope9predicate("digital", 0, _M0FP29rulescope9rulescope16checkout__policyN6constrS1690, 21)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope16checkout__policyN6constrS1691, 22)], 20, ["eu", "digital"], true), new _M0TP29rulescope9rulescope4Rule("R004", "Large VIP discount", 60, [_M0FP29rulescope9rulescope9predicate("tier", 0, _M0FP29rulescope9rulescope16checkout__policyN6constrS1692, 25), _M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope16checkout__policyN6constrS1693, 25)], [_M0FP29rulescope9rulescope6action("discount", _M0FP29rulescope9rulescope16checkout__policyN6constrS1694, 26)], 24, ["vip", "discount"], true), new _M0TP29rulescope9rulescope4Rule("R005", "Large order discount", 50, [_M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope16checkout__policyN6constrS1695, 29)], [_M0FP29rulescope9rulescope6action("discount", _M0FP29rulescope9rulescope16checkout__policyN6constrS1696, 30)], 28, ["discount"], true), new _M0TP29rulescope9rulescope4Rule("R006", "Regular adult orders are allowed", 10, [_M0FP29rulescope9rulescope9predicate("amount", 2, _M0FP29rulescope9rulescope16checkout__policyN6constrS1697, 33), _M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope16checkout__policyN6constrS1698, 33)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope16checkout__policyN6constrS1699, 34)], 32, ["default"], true)];
  return new _M0TP29rulescope9rulescope6Policy("Checkout policy", "1.0.0", fields, rules, "Demonstrates equal-priority conflict, precedence, and coverage gaps.");
}
function _M0FP29rulescope9rulescope15expense__policy() {
  const fields = [_M0FP29rulescope9rulescope12input__field("amount", _M0FP29rulescope9rulescope15expense__policyN6constrS1700, 3), _M0FP29rulescope9rulescope12input__field("level", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["staff", "manager", "director"]), 4), _M0FP29rulescope9rulescope12input__field("receipt", _M0DTP29rulescope9rulescope9FieldKind7Boolean__, 5), _M0FP29rulescope9rulescope12input__field("category", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["travel", "meal", "equipment"]), 6), _M0FP29rulescope9rulescope13output__field("decision", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["approve", "reject", "review"]), 8)];
  const rules = [_M0FP29rulescope9rulescope4rule("E001", "Reject large claims without a receipt", 100, [_M0FP29rulescope9rulescope9predicate("receipt", 0, _M0FP29rulescope9rulescope15expense__policyN6constrS1701, 11), _M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope15expense__policyN6constrS1702, 11)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope15expense__policyN6constrS1703, 12)]), _M0FP29rulescope9rulescope4rule("E002", "Directors can self-approve small claims", 100, [_M0FP29rulescope9rulescope9predicate("level", 0, _M0FP29rulescope9rulescope15expense__policyN6constrS1704, 15), _M0FP29rulescope9rulescope9predicate("amount", 2, _M0FP29rulescope9rulescope15expense__policyN6constrS1705, 15)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope15expense__policyN6constrS1706, 16)]), _M0FP29rulescope9rulescope4rule("E003", "Equipment purchases require review", 80, [_M0FP29rulescope9rulescope9predicate("category", 0, _M0FP29rulescope9rulescope15expense__policyN6constrS1707, 19), _M0FP29rulescope9rulescope9predicate("amount", 5, _M0FP29rulescope9rulescope15expense__policyN6constrS1708, 19)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope15expense__policyN6constrS1709, 20)]), _M0FP29rulescope9rulescope4rule("E004", "Managers can approve normal travel", 70, [_M0FP29rulescope9rulescope9predicate("level", 0, _M0FP29rulescope9rulescope15expense__policyN6constrS1710, 23), _M0FP29rulescope9rulescope9predicate("category", 0, _M0FP29rulescope9rulescope15expense__policyN6constrS1711, 23), _M0FP29rulescope9rulescope9predicate("amount", 2, _M0FP29rulescope9rulescope15expense__policyN6constrS1712, 23)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope15expense__policyN6constrS1713, 24)]), _M0FP29rulescope9rulescope4rule("E005", "Small claims pass automatically", 60, [_M0FP29rulescope9rulescope9predicate("amount", 2, _M0FP29rulescope9rulescope15expense__policyN6constrS1714, 27)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope15expense__policyN6constrS1715, 28)])];
  return new _M0TP29rulescope9rulescope6Policy("Expense policy", "1.0.0", fields, rules, "Expense approval policy with receipt, role, and category boundaries.");
}
function _M0FP29rulescope9rulescope15content__policy() {
  const fields = [_M0FP29rulescope9rulescope12input__field("age", _M0FP29rulescope9rulescope15content__policyN6constrS1716, 3), _M0FP29rulescope9rulescope12input__field("member", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["guest", "normal", "premium"]), 4), _M0FP29rulescope9rulescope12input__field("rating", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["general", "teen", "adult"]), 5), _M0FP29rulescope9rulescope12input__field("region", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["cn", "eu", "us"]), 6), _M0FP29rulescope9rulescope13output__field("access", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["allow", "deny", "verify"]), 8)];
  const rules = [_M0FP29rulescope9rulescope4rule("C001", "Minors cannot access adult content", 100, [_M0FP29rulescope9rulescope9predicate("age", 2, _M0FP29rulescope9rulescope15content__policyN6constrS1717, 11), _M0FP29rulescope9rulescope9predicate("rating", 0, _M0FP29rulescope9rulescope15content__policyN6constrS1718, 11)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15content__policyN6constrS1719, 12)]), _M0FP29rulescope9rulescope4rule("C002", "Premium members can access all content", 100, [_M0FP29rulescope9rulescope9predicate("member", 0, _M0FP29rulescope9rulescope15content__policyN6constrS1720, 15)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15content__policyN6constrS1721, 16)]), _M0FP29rulescope9rulescope4rule("C003", "EU guests must verify", 80, [_M0FP29rulescope9rulescope9predicate("region", 0, _M0FP29rulescope9rulescope15content__policyN6constrS1722, 19), _M0FP29rulescope9rulescope9predicate("member", 0, _M0FP29rulescope9rulescope15content__policyN6constrS1723, 19)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15content__policyN6constrS1724, 20)]), _M0FP29rulescope9rulescope4rule("C004", "General content is open", 40, [_M0FP29rulescope9rulescope9predicate("rating", 0, _M0FP29rulescope9rulescope15content__policyN6constrS1725, 23)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15content__policyN6constrS1726, 24)]), _M0FP29rulescope9rulescope4rule("C005", "Adults can access content", 30, [_M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope15content__policyN6constrS1727, 27)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15content__policyN6constrS1728, 28)])];
  return new _M0TP29rulescope9rulescope6Policy("Content access policy", "1.0.0", fields, rules, "Age, membership, regional verification, and rating policy.");
}
function _M0FP29rulescope9rulescope17insurance__policy() {
  const fields = [_M0FP29rulescope9rulescope12input__field("age", _M0FP29rulescope9rulescope17insurance__policyN6constrS1729, 3), _M0FP29rulescope9rulescope12input__field("claim", _M0FP29rulescope9rulescope17insurance__policyN6constrS1730, 4), _M0FP29rulescope9rulescope12input__field("history", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["clear", "minor", "major"]), 5), _M0FP29rulescope9rulescope12input__field("documents", _M0DTP29rulescope9rulescope9FieldKind7Boolean__, 6), _M0FP29rulescope9rulescope13output__field("decision", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["accept", "reject", "manual"]), 8), _M0FP29rulescope9rulescope13output__field("risk", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["low", "medium", "high"]), 9)];
  const rules = [_M0FP29rulescope9rulescope4rule("I001", "Missing documents require manual review", 100, [_M0FP29rulescope9rulescope9predicate("documents", 0, _M0FP29rulescope9rulescope17insurance__policyN6constrS1731, 12)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope17insurance__policyN6constrS1732, 13)]), _M0FP29rulescope9rulescope4rule("I002", "Major history rejects large claims", 90, [_M0FP29rulescope9rulescope9predicate("history", 0, _M0FP29rulescope9rulescope17insurance__policyN6constrS1733, 16), _M0FP29rulescope9rulescope9predicate("claim", 5, _M0FP29rulescope9rulescope17insurance__policyN6constrS1734, 16)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope17insurance__policyN6constrS1735, 17)]), _M0FP29rulescope9rulescope4rule("I003", "Senior large claims need manual review", 80, [_M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope17insurance__policyN6constrS1736, 20), _M0FP29rulescope9rulescope9predicate("claim", 5, _M0FP29rulescope9rulescope17insurance__policyN6constrS1737, 20)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope17insurance__policyN6constrS1738, 21)]), _M0FP29rulescope9rulescope4rule("I004", "Small claims are accepted", 60, [_M0FP29rulescope9rulescope9predicate("claim", 2, _M0FP29rulescope9rulescope17insurance__policyN6constrS1739, 24)], [_M0FP29rulescope9rulescope6action("decision", _M0FP29rulescope9rulescope17insurance__policyN6constrS1740, 25)]), _M0FP29rulescope9rulescope4rule("I005", "Major history is high risk", 50, [_M0FP29rulescope9rulescope9predicate("history", 0, _M0FP29rulescope9rulescope17insurance__policyN6constrS1741, 28)], [_M0FP29rulescope9rulescope6action("risk", _M0FP29rulescope9rulescope17insurance__policyN6constrS1742, 29)]), _M0FP29rulescope9rulescope4rule("I006", "Clear history is low risk", 40, [_M0FP29rulescope9rulescope9predicate("history", 0, _M0FP29rulescope9rulescope17insurance__policyN6constrS1743, 32)], [_M0FP29rulescope9rulescope6action("risk", _M0FP29rulescope9rulescope17insurance__policyN6constrS1744, 33)])];
  return new _M0TP29rulescope9rulescope6Policy("Insurance intake policy", "1.0.0", fields, rules, "Claim intake policy with two independent outputs.");
}
function _M0FP29rulescope9rulescope18clean__age__policy() {
  return _M0FP29rulescope9rulescope6policy("Clean age gate", [_M0FP29rulescope9rulescope12input__field("age", _M0FP29rulescope9rulescope18clean__age__policyN6constrS1745, 1), _M0FP29rulescope9rulescope13output__field("access", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["allow", "deny"]), 2)], [_M0FP29rulescope9rulescope4rule("A001", "Deny minors", 100, [_M0FP29rulescope9rulescope9predicate("age", 2, _M0FP29rulescope9rulescope18clean__age__policyN6constrS1746, 3)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope18clean__age__policyN6constrS1747, 4)]), _M0FP29rulescope9rulescope4rule("A002", "Allow adults", 100, [_M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope18clean__age__policyN6constrS1748, 5)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope18clean__age__policyN6constrS1749, 6)])]);
}
function _M0FP29rulescope9rulescope15age__policy__v2() {
  return _M0FP29rulescope9rulescope6policy("Clean age gate v2", [_M0FP29rulescope9rulescope12input__field("age", _M0FP29rulescope9rulescope15age__policy__v2N6constrS1770, 1), _M0FP29rulescope9rulescope13output__field("access", new _M0DTP29rulescope9rulescope9FieldKind11Enumeration(["allow", "deny", "review"]), 2)], [_M0FP29rulescope9rulescope4rule("A001", "Deny children", 100, [_M0FP29rulescope9rulescope9predicate("age", 2, _M0FP29rulescope9rulescope15age__policy__v2N6constrS1771, 3)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15age__policy__v2N6constrS1772, 4)]), _M0FP29rulescope9rulescope4rule("A003", "Review young users", 100, [_M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope15age__policy__v2N6constrS1773, 5), _M0FP29rulescope9rulescope9predicate("age", 2, _M0FP29rulescope9rulescope15age__policy__v2N6constrS1774, 5)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15age__policy__v2N6constrS1775, 6)]), _M0FP29rulescope9rulescope4rule("A002", "Allow adults", 100, [_M0FP29rulescope9rulescope9predicate("age", 5, _M0FP29rulescope9rulescope15age__policy__v2N6constrS1776, 7)], [_M0FP29rulescope9rulescope6action("access", _M0FP29rulescope9rulescope15age__policy__v2N6constrS1777, 8)])]);
}
function _M0MP29rulescope9rulescope10Evaluation7matched(self, rule_id) {
  const _bind = self.matched_rule_ids;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const id = _bind[_];
      if (id === rule_id) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP29rulescope9rulescope15evaluate__cases(policy, cases) {
  const _p = new Array(cases.length);
  const _p$2 = cases.length;
  let _tmp = 0;
  while (true) {
    const _p$3 = _tmp;
    if (_p$3 < _p$2) {
      const _p$4 = cases[_p$3];
      _p[_p$3] = _M0FP29rulescope9rulescope16evaluate__policy(policy, _p$4);
      _tmp = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _p;
}
function _M0FP29rulescope9rulescope16contains__string(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (value === candidate) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP29rulescope9rulescope18winning__rule__ids(evaluation) {
  const result = [];
  const _bind = evaluation.decisions;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const decision = _bind[_];
      if (!_M0FP29rulescope9rulescope16contains__string(result, decision.rule_id)) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, decision.rule_id);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope14diff__policies(before, after) {
  return _M0FP29rulescope9rulescope27diff__policies__with__limit(before, after, 12000, 500);
}
function _M0MP29rulescope9rulescope10ChangeKind6render(self) {
  switch (self) {
    case 0: {
      return "added-decision";
    }
    case 1: {
      return "removed-decision";
    }
    case 2: {
      return "changed-decision";
    }
    default: {
      return "changed-winning-rule";
    }
  }
}
function _M0MP29rulescope9rulescope12BehaviorDiff12render__text(self) {
  let rendered = `Behavior diff: ${self.before_name} -> ${self.after_name}\n`;
  rendered = `${rendered}checked=${_M0MPC13int3Int18to__string_2einner(self.checked_cases, 10)} changes=${_M0MPC13int3Int18to__string_2einner(self.changes.length, 10)}\n`;
  const _bind = self.changes;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const change = _bind[_];
      const _bind$3 = change.before;
      let before_value;
      if (_bind$3 === undefined) {
        before_value = "<missing>";
      } else {
        const _Some = _bind$3;
        const _value = _Some;
        before_value = _M0MP29rulescope9rulescope5Value14render__quoted(_value);
      }
      const _bind$4 = change.after;
      let after_value;
      if (_bind$4 === undefined) {
        after_value = "<missing>";
      } else {
        const _Some = _bind$4;
        const _value = _Some;
        after_value = _M0MP29rulescope9rulescope5Value14render__quoted(_value);
      }
      rendered = `${rendered}[${_M0MP29rulescope9rulescope10ChangeKind6render(change.kind)}] ${change.output}: ${before_value} -> ${after_value} for ${_M0MP29rulescope9rulescope9InputCase6render(change.input)}\n`;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return rendered;
}
function _M0FP29rulescope9rulescope19append__all__issues(target, source) {
  const _bind = source.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const issue = source[_];
      _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(target, issue);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP29rulescope9rulescope19calculate__coverage(policy, evaluations) {
  const result = [];
  const _bind = policy.rules;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const item = _bind[_];
      let match_count = 0;
      let win_count = 0;
      const _bind$3 = evaluations.length;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$3) {
          const evaluation = evaluations[_$2];
          if (_M0MP29rulescope9rulescope10Evaluation7matched(evaluation, item.id)) {
            match_count = match_count + 1 | 0;
          }
          const _bind$4 = _M0FP29rulescope9rulescope18winning__rule__ids(evaluation);
          const _bind$5 = _bind$4.length;
          let _tmp$3 = 0;
          while (true) {
            const _$3 = _tmp$3;
            if (_$3 < _bind$5) {
              const winner = _bind$4[_$3];
              if (winner === item.id) {
                win_count = win_count + 1 | 0;
                break;
              }
              _tmp$3 = _$3 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, new _M0TP29rulescope9rulescope12RuleCoverage(item.id, match_count, win_count, evaluations.length));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope16calculate__stats(issues, evaluations) {
  let covered = 0;
  const _bind = evaluations.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const evaluation = evaluations[_];
      if (evaluation.decisions.length > 0) {
        covered = covered + 1 | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let critical = 0;
  let warnings = 0;
  let information = 0;
  const _bind$2 = issues.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const issue = issues[_];
      const _bind$3 = issue.severity;
      switch (_bind$3) {
        case 0: {
          critical = critical + 1 | 0;
          break;
        }
        case 1: {
          warnings = warnings + 1 | 0;
          break;
        }
        default: {
          information = information + 1 | 0;
        }
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP29rulescope9rulescope13AnalysisStats(evaluations.length, covered, evaluations.length - covered | 0, critical, warnings, information);
}
function _M0FP29rulescope9rulescope13conflict__key(left, right, output) {
  return _M0IP016_24default__implPB7Compare6op__ltGsE(left, right) ? `${left}:${right}:${output}` : `${right}:${left}:${output}`;
}
function _M0FP29rulescope9rulescope14contains__text(values, candidate) {
  const _bind = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const value = values[_];
      if (value === candidate) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP29rulescope9rulescope32matched__rules__from__evaluation(policy, evaluation) {
  const result = [];
  const _bind = evaluation.matched_rule_ids;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const id = _bind[_];
      const _bind$3 = _M0MP29rulescope9rulescope6Policy10find__rule(policy, id);
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _item = _Some;
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(result, _item);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function _M0FP29rulescope9rulescope15find__conflicts(policy, evaluations) {
  const issues = [];
  const seen = [];
  const _bind = evaluations.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const evaluation = evaluations[_];
      const matched = _M0FP29rulescope9rulescope32matched__rules__from__evaluation(policy, evaluation);
      let _tmp$2 = 0;
      while (true) {
        const left_index = _tmp$2;
        if (left_index < matched.length) {
          const left = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(matched, left_index);
          let _tmp$3 = left_index + 1 | 0;
          while (true) {
            const right_index = _tmp$3;
            if (right_index < matched.length) {
              _L: {
                const right = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(matched, right_index);
                if (left.priority !== right.priority) {
                  break _L;
                }
                const _bind$2 = left.actions;
                const _bind$3 = _bind$2.length;
                let _tmp$4 = 0;
                while (true) {
                  const _$2 = _tmp$4;
                  if (_$2 < _bind$3) {
                    const left_action = _bind$2[_$2];
                    const _bind$4 = right.actions;
                    const _bind$5 = _bind$4.length;
                    let _tmp$5 = 0;
                    while (true) {
                      const _$3 = _tmp$5;
                      if (_$3 < _bind$5) {
                        const right_action = _bind$4[_$3];
                        if (left_action.output === right_action.output && _M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope5ValueE(left_action.value, right_action.value)) {
                          const key = _M0FP29rulescope9rulescope13conflict__key(left.id, right.id, left_action.output);
                          if (!_M0FP29rulescope9rulescope14contains__text(seen, key)) {
                            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(seen, key);
                            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS1001", 0, 0, `Equal-priority rules disagree on ${left_action.output}`, `${left.name} emits ${_M0MP29rulescope9rulescope5Value14render__quoted(left_action.value)} while ${right.name} emits ${_M0MP29rulescope9rulescope5Value14render__quoted(right_action.value)}.`, [left.id, right.id], evaluation.input, [new _M0TP29rulescope9rulescope12EvidenceStep(left.id, `${left.name} matched`, `priority ${_M0MPC13int3Int18to__string_2einner(left.priority, 10)}`), new _M0TP29rulescope9rulescope12EvidenceStep(right.id, `${right.name} matched`, `priority ${_M0MPC13int3Int18to__string_2einner(right.priority, 10)}`)], "Make the predicates mutually exclusive or assign an explicit priority order."));
                          }
                        }
                        _tmp$5 = _$3 + 1 | 0;
                        continue;
                      } else {
                        break;
                      }
                    }
                    _tmp$4 = _$2 + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                break _L;
              }
              _tmp$3 = right_index + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$2 = left_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope20find__coverage__gaps(policy, evaluations) {
  const issues = [];
  const _bind = _M0MP29rulescope9rulescope6Policy14output__fields(policy);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const output = _bind[_];
      let uncovered = 0;
      let witness = undefined;
      const _bind$3 = evaluations.length;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$3) {
          const evaluation = evaluations[_$2];
          const _bind$4 = _M0MP29rulescope9rulescope10Evaluation13decision__for(evaluation, output.name);
          if (_bind$4 === undefined) {
            uncovered = uncovered + 1 | 0;
            const _bind$5 = witness;
            if (_bind$5 === undefined) {
              witness = evaluation.input;
            }
          }
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (uncovered > 0) {
        const severe = (Math.imul(uncovered, 5) | 0) > evaluations.length;
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS3001", severe ? 1 : 2, 3, `Output ${output.name} has uncovered inputs`, `${_M0MPC13int3Int18to__string_2einner(uncovered, 10)} of ${_M0MPC13int3Int18to__string_2einner(evaluations.length, 10)} boundary cases have no value for ${output.name}.`, [], witness, [], "Add an explicit default rule or document caller behavior for missing decisions."));
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope22find__duplicate__rules(policy) {
  const issues = [];
  let _tmp = 0;
  while (true) {
    const left_index = _tmp;
    if (left_index < policy.rules.length) {
      const left = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.rules, left_index);
      let _tmp$2 = left_index + 1 | 0;
      while (true) {
        const right_index = _tmp$2;
        if (right_index < policy.rules.length) {
          const right = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.rules, right_index);
          if (_M0IPC15array5ArrayPB2Eq5equalGRP29rulescope9rulescope9PredicateE(left.predicates, right.predicates) && (_M0IPC15array5ArrayPB2Eq5equalGRP29rulescope9rulescope6ActionE(left.actions, right.actions) && left.priority === right.priority)) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS5002", 2, 6, `Rules ${left.id} and ${right.id} are duplicates`, "Both rules have the same predicates, actions, and priority.", [left.id, right.id], undefined, [], "Keep one rule and merge any documentation or tags."));
          }
          _tmp$2 = right_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = left_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope27find__redundant__predicates(policy) {
  const issues = [];
  const _bind = policy.rules;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const item = _bind[_];
      let _tmp$2 = 0;
      while (true) {
        const left_index = _tmp$2;
        if (left_index < item.predicates.length) {
          let _tmp$3 = left_index + 1 | 0;
          while (true) {
            const right_index = _tmp$3;
            if (right_index < item.predicates.length) {
              if (_M0IP29rulescope9rulescope9PredicatePB2Eq5equal(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(item.predicates, left_index), _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(item.predicates, right_index))) {
                _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS5001", 2, 5, `Rule ${item.id} repeats a predicate`, `${_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(item.predicates, left_index).field} ${_M0MP29rulescope9rulescope9CompareOp6render(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(item.predicates, left_index).operator)} ${_M0MP29rulescope9rulescope5Value14render__quoted(_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(item.predicates, left_index).expected)} appears more than once.`, [item.id], undefined, [], "Remove the repeated predicate to keep the rule concise."));
              }
              _tmp$3 = right_index + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$2 = left_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope22first__matching__input(evaluations, rule_id) {
  const _bind = evaluations.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const evaluation = evaluations[_];
      if (_M0MP29rulescope9rulescope10Evaluation7matched(evaluation, rule_id)) {
        return evaluation.input;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FP29rulescope9rulescope32find__unreachable__and__shadowed(policy, coverage, evaluations) {
  const issues = [];
  const _bind = coverage.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const row = coverage[_];
      const _bind$2 = _M0MP29rulescope9rulescope6Policy10find__rule(policy, row.rule_id);
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _item = _Some;
        if (row.match_count === 0) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS2001", 1, 2, `Rule ${_item.id} is unreachable`, `${_item.name} did not match any generated boundary case.`, [_item.id], undefined, [], "Check contradictory predicates, field bounds, and enumeration spelling."));
        } else {
          if (row.win_count === 0) {
            const witness = _M0FP29rulescope9rulescope22first__matching__input(evaluations, _item.id);
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, new _M0TP29rulescope9rulescope5Issue("RS2002", 1, 1, `Rule ${_item.id} is always shadowed`, `${_item.name} matched ${_M0MPC13int3Int18to__string_2einner(row.match_count, 10)} cases but never won an output.`, [_item.id], witness, [], "Narrow the higher-priority rule, raise this priority, or remove dead policy text."));
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope14invalid__issue(code, title, description, rule_ids, recommendation) {
  return new _M0TP29rulescope9rulescope5Issue(code, 1, 4, title, description, rule_ids, undefined, [], recommendation);
}
function _M0FP29rulescope9rulescope16validate__fields(policy) {
  const issues = [];
  let _tmp = 0;
  while (true) {
    const left_index = _tmp;
    if (left_index < policy.fields.length) {
      const left = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.fields, left_index);
      if (left.name === "") {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4010", "Field name is empty", `A field declared on line ${_M0MPC13int3Int18to__string_2einner(left.source_line, 10)} has no name.`, [], "Give the field a stable identifier."));
      }
      const _bind = left.kind;
      switch (_bind.$tag) {
        case 0: {
          const _Integer = _bind;
          const _minimum = _Integer._0;
          const _maximum = _Integer._1;
          if (_minimum > _maximum) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4011", "Integer field has an inverted range", `${left.name} declares ${_M0MPC13int3Int18to__string_2einner(_minimum, 10)}..${_M0MPC13int3Int18to__string_2einner(_maximum, 10)}`, [], "Swap the bounds or correct the intended numeric range."));
          }
          break;
        }
        case 2: {
          const _Enumeration = _bind;
          const _values = _Enumeration._0;
          if (_values.length === 0) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4012", "Enumeration field has no values", `${left.name} cannot produce or accept any value.`, [], "Add at least one enumeration value."));
          }
          let _tmp$2 = 0;
          while (true) {
            const value_index = _tmp$2;
            if (value_index < _values.length) {
              let _tmp$3 = value_index + 1 | 0;
              while (true) {
                const other_index = _tmp$3;
                if (other_index < _values.length) {
                  if (_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(_values, value_index) === _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(_values, other_index)) {
                    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4013", "Enumeration contains a duplicate value", `${left.name} repeats ${_M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(_values, value_index)}.`, [], "Remove the duplicate enumeration value."));
                  }
                  _tmp$3 = other_index + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _tmp$2 = value_index + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          break;
        }
      }
      let _tmp$3 = left_index + 1 | 0;
      while (true) {
        const right_index = _tmp$3;
        if (right_index < policy.fields.length) {
          const right = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.fields, right_index);
          if (left.name === right.name) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4014", "Field is declared more than once", `${left.name} appears at least twice in the policy schema.`, [], "Keep one authoritative declaration for the field."));
          }
          _tmp$3 = right_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = left_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope26validate__rule__references(policy, item) {
  const issues = [];
  const _bind = item.predicates;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const condition = _bind[_];
      const _bind$3 = _M0MP29rulescope9rulescope6Policy11find__field(policy, condition.field);
      if (_bind$3 === undefined) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4030", "Predicate references an unknown field", `${item.id} reads ${condition.field}, which is not declared.`, [item.id], "Declare the field or correct the predicate spelling."));
      } else {
        const _Some = _bind$3;
        const _field = _Some;
        if (_M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope9FieldRoleE(_field.role, 0)) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4031", "Predicate reads an output field", `${item.id} reads output ${condition.field} as input.`, [item.id], "Move the value to the input schema or rewrite the condition."));
        }
        if (!_M0MP29rulescope9rulescope9FieldKind8contains(_field.kind, condition.expected)) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4032", "Predicate value is outside the field domain", `${_M0MP29rulescope9rulescope5Value14render__quoted(condition.expected)} is invalid for ${condition.field}.`, [item.id], "Use a value declared by the field domain."));
        }
        let _tmp$2;
        if (_M0MP29rulescope9rulescope9CompareOp12is__ordering(condition.operator)) {
          const _p = _M0MP29rulescope9rulescope9FieldKind4name(_field.kind);
          const _p$2 = "int";
          _tmp$2 = !(_p === _p$2);
        } else {
          _tmp$2 = false;
        }
        if (_tmp$2) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4033", "Ordering operator is applied to a non-integer field", `${item.id} compares ${condition.field} with ${_M0MP29rulescope9rulescope9CompareOp6render(condition.operator)}.`, [item.id], "Use = or != for boolean and enumeration fields."));
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$3 = item.actions;
  const _bind$4 = _bind$3.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$4) {
      const assignment = _bind$3[_];
      const _bind$5 = _M0MP29rulescope9rulescope6Policy11find__field(policy, assignment.output);
      if (_bind$5 === undefined) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4040", "Action writes an unknown output", `${item.id} writes ${assignment.output}, which is not declared.`, [item.id], "Declare the output or correct the action spelling."));
      } else {
        const _Some = _bind$5;
        const _field = _Some;
        if (_M0IP016_24default__implPB2Eq10not__equalGRP29rulescope9rulescope9FieldRoleE(_field.role, 1)) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4041", "Action writes an input field", `${item.id} attempts to assign input ${assignment.output}.`, [item.id], "Declare a corresponding output field."));
        }
        if (!_M0MP29rulescope9rulescope9FieldKind8contains(_field.kind, assignment.value)) {
          _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4042", "Action value is outside the output domain", `${_M0MP29rulescope9rulescope5Value14render__quoted(assignment.value)} is invalid for ${assignment.output}.`, [item.id], "Use a value declared by the output field."));
        }
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope15validate__rules(policy) {
  const issues = [];
  let _tmp = 0;
  while (true) {
    const left_index = _tmp;
    if (left_index < policy.rules.length) {
      const item = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.rules, left_index);
      if (item.id === "") {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4020", "Rule identifier is empty", `Rule ${item.name} needs a stable identifier for evidence links.`, [item.id], "Assign a unique rule identifier."));
      }
      if (item.predicates.length === 0) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4021", "Rule has no predicates", `${item.name} matches the entire input domain.`, [item.id], "Add an explicit condition or document the rule as a default."));
      }
      if (item.actions.length === 0) {
        _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4022", "Rule has no actions", `${item.name} can match but cannot affect any output.`, [item.id], "Add an output assignment or remove the rule."));
      }
      let _tmp$2 = left_index + 1 | 0;
      while (true) {
        const other_index = _tmp$2;
        if (other_index < policy.rules.length) {
          if (item.id === _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(policy.rules, other_index).id) {
            _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4023", "Rule identifier is duplicated", `${item.id} is used by multiple rules.`, [item.id], "Give every rule a unique identifier."));
          }
          _tmp$2 = other_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope26validate__rule__references(policy, item));
      _tmp = left_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return issues;
}
function _M0FP29rulescope9rulescope16validate__policy(policy) {
  const issues = [];
  if (policy.name === "") {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4001", "Policy name is empty", "A stable policy name is required in reports and behavioral diffs.", [], "Add a non-empty policy name."));
  }
  if (_M0MP29rulescope9rulescope6Policy13input__fields(policy).length === 0) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4002", "Policy has no input fields", "No candidate domain can be generated without at least one input field.", [], "Declare one or more input fields."));
  }
  if (_M0MP29rulescope9rulescope6Policy14output__fields(policy).length === 0) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4003", "Policy has no output fields", "Rules cannot communicate a decision without an output field.", [], "Declare one or more output fields."));
  }
  if (policy.rules.length === 0) {
    _M0MPC15array5Array4pushGRP29rulescope9rulescope5IssueE(issues, _M0FP29rulescope9rulescope14invalid__issue("RS4004", "Policy has no rules", "The policy cannot cover any input because it contains no rules.", [], "Add at least one rule."));
  }
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope16validate__fields(policy));
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope15validate__rules(policy));
  return issues;
}
function _M0FP29rulescope9rulescope21analyze__with__config(policy, config) {
  const declaration_issues = _M0FP29rulescope9rulescope16validate__policy(policy);
  const domains = _M0FP29rulescope9rulescope25build__candidate__domains(policy, config);
  const cases = _M0FP29rulescope9rulescope16enumerate__cases(domains, config.maximum_cases);
  const evaluations = _M0FP29rulescope9rulescope15evaluate__cases(policy, cases);
  const issues = _M0MPC15array5Array4copyGRP29rulescope9rulescope5IssueE(declaration_issues);
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope22find__duplicate__rules(policy));
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope27find__redundant__predicates(policy));
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope15find__conflicts(policy, evaluations));
  const coverage = _M0FP29rulescope9rulescope19calculate__coverage(policy, evaluations);
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope32find__unreachable__and__shadowed(policy, coverage, evaluations));
  _M0FP29rulescope9rulescope19append__all__issues(issues, _M0FP29rulescope9rulescope20find__coverage__gaps(policy, evaluations));
  const stats = _M0FP29rulescope9rulescope16calculate__stats(issues, evaluations);
  return new _M0TP29rulescope9rulescope14AnalysisReport(policy.name, issues, coverage, evaluations, stats);
}
function _M0FP29rulescope9rulescope7analyze(policy) {
  return _M0FP29rulescope9rulescope21analyze__with__config(policy, _M0MP29rulescope9rulescope17ExplorationConfig8standardN6recordS1677);
}
function _M0MP29rulescope9rulescope14AnalysisReport12render__text(self) {
  let rendered = `RuleScope report: ${self.policy_name}\n`;
  const _tmp = rendered;
  const _tmp$2 = _M0MPC13int3Int18to__string_2einner(self.stats.candidate_cases, 10);
  const _p = self.stats;
  rendered = `${_tmp}cases=${_tmp$2} coverage=${_M0MPC13int3Int18to__string_2einner(_p.candidate_cases === 0 ? 0 : (Math.imul(_p.covered_cases, 100) | 0) / _p.candidate_cases | 0, 10)}% issues=${_M0MPC13int3Int18to__string_2einner(self.issues.length, 10)}\n`;
  let _tmp$3 = 0;
  while (true) {
    const index = _tmp$3;
    if (index < self.issues.length) {
      const issue = _M0MPC15array5Array2atGRP29rulescope9rulescope5IssueE(self.issues, index);
      rendered = `${rendered}${_M0MPC13int3Int18to__string_2einner(index + 1 | 0, 10)}. [${issue.code}] ${issue.title}\n`;
      rendered = `${rendered}   ${issue.description}\n`;
      const _bind = issue.counterexample;
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _input = _Some;
        rendered = `${rendered}   example ${_M0MP29rulescope9rulescope9InputCase6render(_input)}\n`;
      }
      _tmp$3 = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return rendered;
}
function _M0FP49rulescope9rulescope3web4core15engine__version() {
  return "0.1.0";
}
function _M0FP49rulescope9rulescope3web4core17analyze__scenario(name) {
  let selected;
  switch (name) {
    case "checkout": {
      selected = _M0FP29rulescope9rulescope16checkout__policy();
      break;
    }
    case "expense": {
      selected = _M0FP29rulescope9rulescope15expense__policy();
      break;
    }
    case "content": {
      selected = _M0FP29rulescope9rulescope15content__policy();
      break;
    }
    case "insurance": {
      selected = _M0FP29rulescope9rulescope17insurance__policy();
      break;
    }
    case "clean-age": {
      selected = _M0FP29rulescope9rulescope18clean__age__policy();
      break;
    }
    default: {
      selected = undefined;
    }
  }
  if (selected === undefined) {
    return `Unknown RuleScope scenario: ${name}`;
  } else {
    const _Some = selected;
    const _policy = _Some;
    return _M0MP29rulescope9rulescope14AnalysisReport12render__text(_M0FP29rulescope9rulescope7analyze(_policy));
  }
}
function _M0FP49rulescope9rulescope3web4core17diff__age__policy() {
  return _M0MP29rulescope9rulescope12BehaviorDiff12render__text(_M0FP29rulescope9rulescope14diff__policies(_M0FP29rulescope9rulescope18clean__age__policy(), _M0FP29rulescope9rulescope15age__policy__v2()));
}
export { _M0FP49rulescope9rulescope3web4core15engine__version as engine_version, _M0FP49rulescope9rulescope3web4core17analyze__scenario as analyze_scenario, _M0FP49rulescope9rulescope3web4core17diff__age__policy as diff_age_policy }
