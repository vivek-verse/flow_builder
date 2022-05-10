import * as React from 'react';
import { CustomNodeModel } from './CustomNodeModel';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { Card, Select, Skeleton, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import nameList from '../static/nameList';

const { Option } = Select;
const { Meta, Grid } = Card;

export interface CustomNodeWidgetProps {
	node: CustomNodeModel;
	engine: DiagramEngine;
	size: number;
}

namespace S {
	export const Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;

		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;
}

function handleChange(value : string) {
  console.log(`selected ${value}`);
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
	render() {

		const width = 250;

		return (
			<>

				<Card
				style={{ width }}
				hoverable
				// actions={[
				// 	<SettingOutlined key="setting" />,
				// 	<EditOutlined key="edit" />,
				// ]}
				>
					<Skeleton loading={false} avatar active>
						<Meta
						// avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						title="Select Name"
						description="Select a name"
						/>
						<Select defaultValue={nameList[0]} style={{ display:'flex', marginTop:'5px' }} onChange={handleChange}>
							{
								nameList.map((item) => {
									return <Option value={item}>{item}</Option>

								})
							}
						</Select>
					</Skeleton>
				</Card>

				<PortWidget
					style={{
						left: width / 2  - this.props.size / 4,
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
						left: width / 2  - this.props.size / 4,
						bottom: -this.props.size / 4,
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
