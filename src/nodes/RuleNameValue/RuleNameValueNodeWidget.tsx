import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { RuleNameValueNodeModel } from "./RuleNameValueNodeModel";
import { RuleListDropdown } from "./RuleListDropdown";

export interface RuleNameValueNodeProps extends CustomNodeProps<RuleNameValueNodeModel> {}

export class RuleNameValueNodeWidget extends CustomNodeWidget<RuleNameValueNodeProps> {

	public value = this.props.node.getOptions().title || "";
  
    handleCallback = (value : string) =>{
		this.value = value;
		this.props.node.updateOptions({title : value});
    }

	render() {
		return super.construct(
			<RuleListDropdown value={this.value} parentCallback = { this.handleCallback } />
		);
	}
}
