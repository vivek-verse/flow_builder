import * as SRD from '@projectstorm/react-diagrams';
import { OneToOneNodeFactory, OneToOneNodeModel } from './nodes/OneToOne';

export class Application {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.newModel();
	}
	   
	public getModel(){
		return this.diagramEngine.getModel();
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);
		const model = this.diagramEngine.getModel();

		model.registerListener({
			eventDidFire : () => {
				// console.log("Event did fire");
			},
			linksUpdated : () => {
				// console.log("Links upated");
			},
			nodesUpdated : () => {
				// console.log("Nodes upated");
			},
			// gridUpdated: e => console.log("gridUpdated", e),
			// offsetUpdated: e => console.log("offsetUpdated", e),
			// entityRemoved: e => console.log("entityRemoved", e),
			// selectionChanged: e => console.log("selectionChanged", e)
		})


		this.diagramEngine.getNodeFactories().registerFactory(new OneToOneNodeFactory());

		const node = new OneToOneNodeModel();
		node.setPosition(250, 200);

		// link the ports
		// let link1 = port.link(port2);

		// this.activeModel.addAll(node1, node2, node3, link1);
		this.activeModel.addAll(node);

	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
