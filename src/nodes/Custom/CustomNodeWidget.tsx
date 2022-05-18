import * as React from 'react';
import { CustomNodeModel } from './CustomNodeModel';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { OneToOneOutlined } from '@ant-design/icons';
export interface CustomNodeWidgetProps {
	node: CustomNodeModel;
	engine: DiagramEngine;
	size: number;
}

namespace S {
	export const Port = styled.div`
		width: 12px;
		height: 12px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;

		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
	render() {
        const width  = 30;
		return (
			<>
                <div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
                    <OneToOneOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
                </div>

				<PortWidget
					style={{
						left: width / 4  + 3,
						top: -8,
						position: 'absolute'
					}}
                    //@ts-ignore
					port={this.props.node.getPort(PortModelAlignment.TOP)}
					engine={this.props.engine}>
					<S.Port />
				</PortWidget>
				<PortWidget
					style={{
						left: width / 4 + 3,
						bottom: -this.props.size / 8,
						position: 'absolute'
					}}
                    //@ts-ignore
					port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
					engine={this.props.engine}>
					<S.Port />
				</PortWidget>

			</>
		);
	}
}
