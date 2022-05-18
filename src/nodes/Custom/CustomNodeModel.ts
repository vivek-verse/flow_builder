import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CustomPortModel } from './CustomPortModel';

export interface CustomNodeModelGenerics {
  PORT: CustomPortModel;
}

export class CustomNodeModel extends NodeModel<NodeModelGenerics & CustomNodeModelGenerics> {
  constructor(type : string) {
    super({
      type
    });
    this.addPort(new CustomPortModel(PortModelAlignment.TOP, type));
    this.addPort(new CustomPortModel(PortModelAlignment.LEFT, type));
    this.addPort(new CustomPortModel(PortModelAlignment.BOTTOM, type));
    this.addPort(new CustomPortModel(PortModelAlignment.RIGHT, type));
  }
}
