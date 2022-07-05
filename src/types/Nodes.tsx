import { DeriveNodeModel } from "../nodes/Derive";
// import { RuleNameValueNodeModel } from "../nodes/RuleNameValue";
import { RuleNameNodeModel } from "../nodes/RuleName";
import { RulesNodeModel } from "../nodes/Rules";
import { StartNodeModel } from "../nodes/Start";
import { InputNodeModel } from "../nodes/Input";

const nodeMap = {
    "start" : StartNodeModel,
    "rules" : RulesNodeModel,
    "ruleName" : RuleNameNodeModel,
    // "ruleNameNext" : RuleNameValueNodeModel,
    "derive" : DeriveNodeModel,
    // "deriveNext" : InputNodeModel,
    "ruleNameNext" : InputNodeModel,

};

export default  nodeMap;
