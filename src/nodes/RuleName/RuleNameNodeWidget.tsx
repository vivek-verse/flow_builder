import { StarOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { RuleNameNodeModel } from "./RuleNameNodeModel";

export interface RuleNameNodeProps extends CustomNodeProps<RuleNameNodeModel> {}

export class RuleNameNodeWidget extends CustomNodeWidget<RuleNameNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				<StarOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
			</div>
		);
	}
}
