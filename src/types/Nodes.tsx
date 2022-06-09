import { DeriveNodeModel } from "../nodes/Derive";
import { OneToOneNodeModel } from "../nodes/OneToOne";
import { RuleNameNodeModel } from "../nodes/RuleName";
import { RulesNodeModel } from "../nodes/Rules";
import { StartNodeModel } from "../nodes/Start";

const nodeMap = {
    "start" : StartNodeModel,
    "rules" : RulesNodeModel,
    "ruleName" : RuleNameNodeModel,
    "OneToOne" : OneToOneNodeModel,
    "derive" : DeriveNodeModel
};

export default  nodeMap;
