import { OneToOneOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { OneToOneNodeModel } from "./OneToOneNodeModel";

export interface OneToOneNodeProps extends CustomNodeProps<OneToOneNodeModel> {}

export class OneToOneNodeWidget extends CustomNodeWidget<OneToOneNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				<OneToOneOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
			</div>
		);
	}
}
