import { BorderOuterOutlined, EditOutlined, ExportOutlined, OneToOneOutlined, StarOutlined } from "@ant-design/icons";
import { ArrayFactory } from "../nodes/Array";
import { CustomNodeFactory, CustomNodeModelGenerics, CustomNodeModelOptions, CustomNodeModel } from "../nodes/Custom";
import { DeriveFactory } from "../nodes/Derive";
import { RuleNameValueFactory } from "../nodes/RuleNameValue";
import { RuleNameFactory } from "../nodes/RuleName";
import { RulesFactory } from "../nodes/Rules";
export const NodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [
    RulesFactory,
    RuleNameValueFactory,
    ArrayFactory,
    DeriveFactory,
    RuleNameFactory
];

export const UINodes = [
    EditOutlined,
    OneToOneOutlined,
    BorderOuterOutlined,
    ExportOutlined,
    StarOutlined
]

export const AllNodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [...NodeFactories];
