import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { RuleNameValueNodeModel } from "./RuleNameValueNodeModel";
import { RuleListDropdown } from "./RuleListDropdown";

export interface RuleNameValueNodeProps extends CustomNodeProps<RuleNameValueNodeModel> {}

export class RuleNameValueNodeWidget extends CustomNodeWidget<RuleNameValueNodeProps> {

	public value = "";
  
    handleCallback = (value : string) =>{
		this.props.node.updateOptions({title : value})
    }

	render() {
		return super.construct(
			<RuleListDropdown parentCallback = { this.handleCallback } />
		);
	}
}
