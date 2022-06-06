import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { ArrayNodeModel } from './ArrayNodeModel';
import { ArrayNodeWidget } from './ArrayNodeWidget';
export class ArrayNodeFactory extends CustomNodeFactory<ArrayNodeModel>{
	constructor() {
		super("Array", "Array", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<ArrayNodeModel>): JSX.Element {
    return <ArrayNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): ArrayNodeModel {
	return new ArrayNodeModel({ color: this.options.color });
  }

}

export const ArrayFactory = new ArrayNodeFactory();
