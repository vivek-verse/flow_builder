import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { OneToOneNodeModel } from './OneToOneNodeModel';
import { OneToOneNodeWidget } from './OneToOneNodeWidget';
export class OneToOneNodeFactory extends CustomNodeFactory<OneToOneNodeModel>{
	constructor() {
		super("onetoone", "OneToOne", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<OneToOneNodeModel>): JSX.Element {
    return <OneToOneNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): OneToOneNodeModel {
	return new OneToOneNodeModel({ color: this.options.color });
  }

}

export const OneToOneFactory = new OneToOneNodeFactory();
