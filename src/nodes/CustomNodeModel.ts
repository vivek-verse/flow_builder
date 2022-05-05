import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CustomPortModel } from './CustomPortModel';

export interface CustomNodeModelGenerics {
  PORT: CustomPortModel;
}

export class CustomNodeModel extends NodeModel<NodeModelGenerics & CustomNodeModelGenerics> {
  constructor() {
    super({
      type: 'custom'
    });
    this.addPort(new CustomPortModel(PortModelAlignment.TOP));
    this.addPort(new CustomPortModel(PortModelAlignment.LEFT));
    this.addPort(new CustomPortModel(PortModelAlignment.BOTTOM));
    this.addPort(new CustomPortModel(PortModelAlignment.RIGHT));
  }
}
