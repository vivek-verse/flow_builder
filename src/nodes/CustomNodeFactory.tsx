import { CustomNodeWidget } from './CustomNodeWidget';
import { CustomNodeModel } from './CustomNodeModel';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class CustomNodeFactory extends AbstractReactFactory<CustomNodeModel, DiagramEngine> {
  constructor() {
    super('custom');
  }

  generateReactWidget(event : GenerateWidgetEvent<CustomNodeModel>): JSX.Element {
    return <CustomNodeWidget engine={this.engine} size={50} node={event.model} />;
  }

  generateModel(event : GenerateModelEvent) {
    return new CustomNodeModel();
  }
}
