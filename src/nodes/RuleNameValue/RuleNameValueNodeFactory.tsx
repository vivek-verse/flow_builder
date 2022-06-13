import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { RuleNameValueNodeModel } from './RuleNameValueNodeModel';
import { RuleNameValueNodeWidget } from './RuleNameValueNodeWidget';
export class RuleNameValueNodeFactory extends CustomNodeFactory<RuleNameValueNodeModel>{
	constructor() {
		super("RuleNameValue", "RuleNameValue", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<RuleNameValueNodeModel>): JSX.Element {
    return <RuleNameValueNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): RuleNameValueNodeModel {
	  return new RuleNameValueNodeModel({ color: this.options.color });
  }

}

export const RuleNameValueFactory = new RuleNameValueNodeFactory();
