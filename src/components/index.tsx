import { BorderOuterOutlined, OneToOneOutlined } from "@ant-design/icons";
import { ArrayFactory } from "../nodes/Array";
import { CustomNodeFactory, CustomNodeModelGenerics, CustomNodeModelOptions, CustomNodeModel } from "../nodes/Custom";
import { OneToOneFactory } from "../nodes/OneToOne";
export const NodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [
    OneToOneFactory,
    ArrayFactory
];

export const UINodes = [
    OneToOneOutlined,
    BorderOuterOutlined
]

export const AllNodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [...NodeFactories];
