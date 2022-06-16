import { TextInput } from '../../components/TextInput';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { InputNodeModel } from "./InputNodeModel";

export interface InputNodeProps extends CustomNodeProps<InputNodeModel> {}

export class InputNodeWidget extends CustomNodeWidget<InputNodeProps> {
    
	public value = this.props.node.getOptions().title || "";
  
    handleCallback = (value : string) => {
		this.value = value;
		this.props.node.updateOptions({title : value});
    }

	render() {
		return super.construct(
				<TextInput value={this.value} parentCallback = { this.handleCallback } />
		);
	}	

}
