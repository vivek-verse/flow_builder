import { StartNodeFactory, StartNodeModel } from './nodes/Start';
import createEngine, { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { ZoomCanvasAction } from './state/ZoomCanvasAction';
import { CloneItemsAction } from './state/CloneItemsAction';
import { DeleteItemsActionCustom } from "./state/DeleteItemsActionCustom";
import { NodeFactories } from './components';

export class Application {
	protected diagramEngine: DiagramEngine;
	protected toast : any;
	constructor(toast :  any) {
		this.toast = toast;
		this.diagramEngine = createEngine({ registerDefaultZoomCanvasAction: false, registerDefaultDeleteItemsAction: false });
		this.diagramEngine.maxNumberPointsPerLink = 0;
		this.newModel();
	}

	public getModel() {
		return this.diagramEngine.getModel();
	}

	public newModel() {    
		const model = new DiagramModel();
		model.registerListener({
			linksUpdated:(event : any) => {
				const { link, isCreated } = event;
				link.registerListener({
					targetPortChanged:(link  :any) => {
						if(isCreated){
							const {sourcePort, targetPort} = link.entity;

							let { parent : 
									{ options : sourceOptions }
								} = sourcePort;

							let { parent : 
									{ options : targetOptions }
								} = targetPort;

							if(sourceOptions.dataType === 'start' && targetOptions.dataType === 'value'){
								model.removeLink(link.entity);
								this.toast.error("Connection not possible, try another node",
								{
									position: "bottom-center"
								});
							}
						}
					}
				});				
			  }
		})

		this.diagramEngine.setModel(model);
		this.diagramEngine.getNodeFactories().registerFactory(new StartNodeFactory());
		NodeFactories.forEach((factory) => this.diagramEngine.getNodeFactories().registerFactory(factory));
		const eventBus = this.diagramEngine.getActionEventBus();
		eventBus.registerAction(new ZoomCanvasAction({ inverseZoom: true }));
		eventBus.registerAction(new DeleteItemsActionCustom({ keyCodes: [46], modifiers: { shiftKey: true } }));
		eventBus.registerAction(new CloneItemsAction({ offset: { x: 50, y: 50 } }));
		const start = new StartNodeModel();
		start.setPosition(250, 200);
		start.setupPorts();
		model.addAll(start);
	}

	public getActiveDiagram(): DiagramModel {
		return this.diagramEngine.getModel();
	}

	public getDiagramEngine(): DiagramEngine {
		return this.diagramEngine;
	}

}
