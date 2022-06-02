import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { DagreEngine, PathFindingLinkFactory, DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { CanvasDragToggle } from './CanvasDragToggle';

import { Collapse } from 'antd';
import { OneToOneOutlined } from '@ant-design/icons';
import { CustomNodeIcon } from './CustomNodeIcon';
import { Application } from '../Application';
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from '../nodes/Custom';
import { AllNodeFactories, NodeFactories } from '.';

const { Panel } = Collapse;
export interface BodyWidgetProps {
	engine : DiagramEngine;
	model : DiagramModel;
}

namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;

	export const CollapseStyle = {
		"color": "white",
		"fontFamily": "Helvetica, Arial",
		"padding": "5px",
		"margin": "0px 10px",
		"border": "solid 1px",
		"borderRadius": "5px",
		"marginBottom": "2px",
		"cursor": "pointer",
	};
}
export class BodyWidget extends React.Component {
	state = {
		app: new Application(() => {
			this.forceUpdate();
		}),
	};

	autoDistribute = () => {
		new DagreEngine({
			graph: {
				rankdir: 'LR',
				ranker: 'longest-path',
				marginx: 50,
				marginy: 50
			},
			includeLinks: false,
		}).redistribute(this.state.app.getModel());
		this.reroute();
		this.state.app.getDiagramEngine().repaintCanvas();
	};

	componentDidMount(): void {
		setTimeout(() => {
			this.autoDistribute();
		}, 0);
	}

	reroute() {
		this.state.app.getDiagramEngine()
			.getLinkFactories()
			.getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
			.calculateRoutingMatrix();
	}

	render() {
		return (
			<S.Body onMouseUp={() => {
				const model = this.state.app.getModel();
				const listLink = Object.values(model.getLinks());
				listLink.forEach(link => {
					if(!link.getTargetPort()){
						model.removeLink(link);
					}
				});
			}}>
				<S.Header>
					<div className="title">Flow Builder</div>
				</S.Header>
				<S.Content>
					<TrayWidget>
						<Collapse style= {S.CollapseStyle} defaultActiveKey={['1']} onChange={() => {}}>
							<Panel header="Custom Nodes" key="1">
								{
									NodeFactories.map((factory) => {
										let options = factory.options;
										return (
											<CustomNodeIcon  key={options.id} model={{ id: options.id }} name={options.id}>
													<OneToOneOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
											</CustomNodeIcon>
										);
									})
								}
							</Panel>
						</Collapse>
					</TrayWidget>
					<S.Layer
						onDrop={(event) => {
							let data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
							let node: CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>> = null!;
							const factory = AllNodeFactories.find((factory) => {
								return factory.options.id === data.id
							});
							//@ts-ignore
							node = factory.generateModel(undefined);
							node.setupPorts();
							let point = this.state.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.state.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<CanvasDragToggle engine={this.state.app.getDiagramEngine()} autoDistribute={this.autoDistribute} />
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}
