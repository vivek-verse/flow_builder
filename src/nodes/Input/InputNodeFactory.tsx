import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { InputNodeModel } from './InputNodeModel';
import { InputNodeWidget } from './InputNodeWidget';
export class InputNodeFactory extends CustomNodeFactory<InputNodeModel>{
	constructor() {
		super("Input", "Input", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<InputNodeModel>): JSX.Element {
    return <InputNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): InputNodeModel {
	return new InputNodeModel({ color: this.options.color });
  }

}

export const InputFactory = new InputNodeFactory();
