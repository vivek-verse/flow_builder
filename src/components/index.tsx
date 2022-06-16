import { BorderOuterOutlined, EditOutlined, ExportOutlined, FileTextOutlined, OneToOneOutlined, StarOutlined } from "@ant-design/icons";
import { ArrayFactory } from "../nodes/Array";
import { CustomNodeFactory, CustomNodeModelGenerics, CustomNodeModelOptions, CustomNodeModel } from "../nodes/Custom";
import { DeriveFactory } from "../nodes/Derive";
import { RuleNameValueFactory } from "../nodes/RuleNameValue";
import { RuleNameFactory } from "../nodes/RuleName";
import { RulesFactory } from "../nodes/Rules";
import { InputFactory } from "../nodes/Input";
export const NodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [
    RulesFactory,
    RuleNameValueFactory,
    ArrayFactory,
    DeriveFactory,
    RuleNameFactory,
    InputFactory
];

export const UINodes = [
    EditOutlined,
    OneToOneOutlined,
    BorderOuterOutlined,
    ExportOutlined,
    StarOutlined,
    FileTextOutlined
]

export const AllNodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [...NodeFactories];
