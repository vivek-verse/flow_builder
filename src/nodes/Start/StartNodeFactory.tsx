import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { StartNodeModel } from './StartNodeModel';
import { StartNodeWidget } from './StartNodeWidget';
export class StartNodeFactory extends CustomNodeFactory<StartNodeModel>{
	constructor() {
		super("start", "Start", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<StartNodeModel>): JSX.Element {
    return <StartNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): StartNodeModel {
	return new StartNodeModel({ color: this.options.color });
  }

}

export const StartFactory = new StartNodeFactory();
