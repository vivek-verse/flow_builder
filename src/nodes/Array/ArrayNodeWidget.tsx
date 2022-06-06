import { BorderOuterOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { ArrayNodeModel } from "./ArrayNodeModel";

export interface ArrayNodeProps extends CustomNodeProps<ArrayNodeModel> {}

export class ArrayNodeWidget extends CustomNodeWidget<ArrayNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				<BorderOuterOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
			</div>
		);
	}
}
