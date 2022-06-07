import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { RulesNodeModel } from './RulesNodeModel';
import { RulesNodeWidget } from './RulesNodeWidget';
export class RulesNodeFactory extends CustomNodeFactory<RulesNodeModel>{
	constructor() {
		super("Rules", "Rules", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<RulesNodeModel>): JSX.Element {
    return <RulesNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): RulesNodeModel {
	return new RulesNodeModel({ color: this.options.color });
  }

}

export const RulesFactory = new RulesNodeFactory();
