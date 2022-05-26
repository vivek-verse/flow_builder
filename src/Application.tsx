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
		//3-A) create a default node
		const node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
		let port = node1.addOutPort('Out');
		node1.setPosition(100, 100);

		//3-B) create another default node
		const node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
		let port2 = node2.addInPort('In');
		node2.addOutPort('Out');
		node2.setPosition(400, 100);

		const node3 = new OneToOneNodeModel();
		node3.setPosition(250, 200);

		// link the ports
		let link1 = port.link(port2);

		this.activeModel.addAll(node1, node2, node3, link1);

	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
