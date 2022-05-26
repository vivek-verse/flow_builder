import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { DagreEngine, DefaultNodeModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { CanvasDragToggle } from './CanvasDragToggle';
import { OneToOneNodeModel } from '../nodes/OneToOne';

import { Collapse } from 'antd';
import { OneToOneOutlined } from '@ant-design/icons';
import { CustomNodeIcon } from './CustomNodeIcon';

const { Panel } = Collapse;
export interface BodyWidgetProps {
	app: Application;
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
export class BodyWidget extends React.Component<BodyWidgetProps> {

	engine: DagreEngine;

	constructor(props : any) {
		super(props.app);
		this.engine = new DagreEngine({
			graph: {
				rankdir: 'RL',
				ranker: 'longest-path',
				marginx: 25,
				marginy: 25
			},
			includeLinks: true
		});
	}

	autoDistribute = () => {
		this.engine.redistribute(this.props.app.getModel());
		this.reroute();
		this.props.app.getDiagramEngine().repaintCanvas();
	};

	componentDidMount(): void {
		setTimeout(() => {
			this.autoDistribute();
		}, 0);
	}

	reroute() {
		this.props.app.getDiagramEngine()
			.getLinkFactories()
			.getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
			.calculateRoutingMatrix();
	}

	render() {
		return (
			<S.Body onMouseUp={() => {
				const model = this.props.app.getModel();
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
								<CustomNodeIcon model={{type : 'OneToOne'}} name="OneToOne">
									<OneToOneOutlined style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
								</CustomNodeIcon>
							</Panel>
						</Collapse>
					</TrayWidget>
					<S.Layer
						onDrop={(event) => {
							const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							const nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

							let node: DefaultNodeModel | OneToOneNodeModel | null = null;
							if (data.type === 'in') {
								node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(192,255,0)');
								if(node instanceof DefaultNodeModel){
									node.addInPort('In');
								}
							} else if(data.type === 'out') {
								node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(0,192,255)');
								if(node instanceof DefaultNodeModel){
									node.addOutPort('Out');
								}
							}else{
								node = new OneToOneNodeModel();
							}
							const point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<CanvasDragToggle engine={this.props.app.getDiagramEngine()} autoDistribute={this.autoDistribute} />
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}
