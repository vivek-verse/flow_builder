import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { RuleNameValueNodeModel } from "./RuleNameValueNodeModel";
import { DiagramContext, DiagramContextInterface } from "../../components/DiagramContext";
import { DynamicDropdown } from '../../components/DynamicDropdown';

export interface RuleNameValueNodeProps extends CustomNodeProps<RuleNameValueNodeModel> {}

export class RuleNameValueNodeWidget extends CustomNodeWidget<RuleNameValueNodeProps> {
	static contextType = DiagramContext; 
	public value = this.props.node.getOptions().title || "";
  
    handleCallback = (value : string) =>{
		this.value = value;
		this.props.node.updateOptions({title : value});
    }

	render() {
		const { rulesList : list } = this.context as DiagramContextInterface;

		return super.construct(
				<DynamicDropdown list={list} value={this.value} parentCallback = { this.handleCallback } />
		);
	}
}
