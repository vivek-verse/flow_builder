import { CustomNodeFactory, CustomNodeModelGenerics, CustomNodeModelOptions, CustomNodeModel } from "../nodes/Custom";
import { OneToOneFactory } from "../nodes/OneToOne";
export const NodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [
    OneToOneFactory
];

export const AllNodeFactories: CustomNodeFactory<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>[] = [...NodeFactories];
