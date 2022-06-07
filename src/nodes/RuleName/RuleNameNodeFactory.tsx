import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { RuleNameNodeModel } from './RuleNameNodeModel';
import { RuleNameNodeWidget } from './RuleNameNodeWidget';
export class RuleNameNodeFactory extends CustomNodeFactory<RuleNameNodeModel>{
	constructor() {
		super("RuleName", "RuleName", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<RuleNameNodeModel>): JSX.Element {
    return <RuleNameNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): RuleNameNodeModel {
	return new RuleNameNodeModel({ color: this.options.color });
  }

}

export const RuleNameFactory = new RuleNameNodeFactory();
