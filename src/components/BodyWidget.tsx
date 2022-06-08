import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { DagreEngine, PathFindingLinkFactory, DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { PortModel, PortModelGenerics } from '@projectstorm/react-diagrams-core';
import styled from '@emotion/styled';
import { CanvasDragToggle } from './CanvasDragToggle';
import { Collapse, Row, Col } from 'antd';
import { CustomNodeIcon } from './CustomNodeIcon';
import { Application } from '../Application';
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from '../nodes/Custom';
import { AllNodeFactories, NodeFactories, UINodes } from '.';

const { Panel } = Collapse;

interface BasicObject {
  [k: string]: any;
}
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

	saveFile = async () => {

		console.log("came in saveFile");

		let { out : node } = this.state.app.getModel().getNode('start').getPorts();
		const exportData = this.nodesToJson(node);

		let fileHandle: FileSystemFileHandle;
		try {
			fileHandle = await showSaveFilePicker({ types: [{ accept: { "json/*": [".json"] } }] });
		} catch (error) {
			return;
		}
		fileHandle.createWritable().then((stream) => {
			stream.write(JSON.stringify(exportData, null, 2));
			stream.close();
		});
	}

	getNextNodeValue(node : PortModel<PortModelGenerics>){
		let value = '';
		const connectionLink = Object.values(node.links)[0];
		if(connectionLink){
			const nextPort = connectionLink.getTargetPort();
			const nextNode = nextPort.getParent();
			const { title } : CustomNodeModelOptions = nextNode.getOptions();
			value = title as string;
		}
		return value;
	}

	nodesToJson(currentNode : PortModel<PortModelGenerics>) {
 		const finalObj: BasicObject = {};
		let node = currentNode;
		const helper = (finalObj: BasicObject, node: PortModel<PortModelGenerics>) => {
			const connectionLinks = Object.values(node.links);
			for (const conn of connectionLinks){
				const targetPort = conn.getTargetPort();
				if(targetPort){
					const connectedNode = targetPort.getParent();
					const data = connectedNode.getOptions();
					const { dataType, func, title } : CustomNodeModelOptions = data;
					const { out } = connectedNode.getPorts();
					if(dataType === "string"){
						const nodeValue = this.getNextNodeValue(out);
						if(Array.isArray(finalObj)){
							finalObj.push({[func as string] : nodeValue});
						}else{
							finalObj[func as string] = nodeValue;

						}
					}else if(dataType === "object"){
						if(Array.isArray(finalObj)){
							finalObj.push({[func as string] : {}});
							helper(finalObj[finalObj.length - 1][func as string], out)
						}else{
							finalObj[func as string] = {};
							helper(finalObj[func as string], out);
						}
					}else if(dataType === "array"){
						if(Array.isArray(finalObj) && func === 'push'){
							finalObj.push([]);
							helper(finalObj[finalObj.length - 1], out);
						}else{
							finalObj[func as string] = [];
							helper(finalObj[func as string], out);
						}						
					}else if(dataType === "value"){
						if(Array.isArray(finalObj)){
							finalObj.push(title);
						}
					}
				}
			}
		}

		helper(finalObj, node);
		return finalObj;
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
						<Collapse style= {S.CollapseStyle} defaultActiveKey={['1']}>
							<Panel header="Custom Nodes" key="1">
								<Row gutter={[16, 16]}>
									{
										NodeFactories.map((factory, i) => {
											let options = factory.options;
											const Tag = UINodes[i];
											return (
												<Col key={i} span={4}>
													<CustomNodeIcon  key={options.id} model={{ id: options.id }} name={options.id}>
															<Tag style={{ fontSize : "25px", display: "table-cell", verticalAlign: "middle", textAlign: "center"}}/>
													</CustomNodeIcon>
												</Col>
											);
										})
									}
								</Row>
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
						<CanvasDragToggle engine={this.state.app.getDiagramEngine()} autoDistribute={this.autoDistribute} saveFile={this.saveFile} />
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}
