import { EditOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { RulesNodeModel } from "./RulesNodeModel";

export interface RulesNodeProps extends CustomNodeProps<RulesNodeModel> {}

export class RulesNodeWidget extends CustomNodeWidget<RulesNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				<EditOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
			</div>
		);
	}
}
