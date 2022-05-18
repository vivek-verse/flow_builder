import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { OneToOneNodeModel } from './OneToOneNodeModel';
import { OneToOneNodeWidget } from './OneToOneNodeWidget';
export class OneToOneNodeFactory extends CustomNodeFactory{
  constructor(){
    super('OneToOne');
  }

  generateReactWidget(event : GenerateWidgetEvent<OneToOneNodeModel>): JSX.Element {
    return <OneToOneNodeWidget engine={this.engine} size={50} node={event.model} />;
  }

}
