import { ExportOutlined } from '@ant-design/icons';
import { CustomNodeWidget } from '../Custom';
import { CustomNodeProps } from '../Custom';
import { DeriveNodeModel } from "./DeriveNodeModel";

export interface DeriveNodeProps extends CustomNodeProps<DeriveNodeModel> {}

export class DeriveNodeWidget extends CustomNodeWidget<DeriveNodeProps> {
    render() {
		return super.construct(
			<div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				<ExportOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
			</div>
		);
	}
}
