import { NodeIndexOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { StartNodeModel } from "./StartNodeModel";

export interface StartNodeProps extends CustomNodeProps<StartNodeModel> {}

export class StartNodeWidget extends CustomNodeWidget<StartNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
                <NodeIndexOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}} />
			</div>
		);
	}
}
