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
						const {sourcePort, targetPort} = link.entity;
						if(isCreated){
							if(Object.keys(targetPort.getLinks()).length > 1){
								model.removeLink(link.entity);
								this.toast.error("Two input connections to one node not allowed", {
									position: "bottom-center"
								});
							}else{
								let { parent : 
										{ options : sourceOptions }
									} = sourcePort;

								let { parent : 
										{ options : targetOptions }
									} = targetPort;

								let showError = false;

								if(sourceOptions.dataType === 'start' && targetOptions.dataType === 'value'){
									showError = true;
								}else if(sourceOptions.dataType === 'string' && targetOptions.dataType === 'object'){
									showError = true;
								}else if(sourceOptions.dataType === 'string' && targetOptions.dataType === 'array'){
									showError = true;
								}else if(sourceOptions.dataType === 'object' && targetOptions.dataType === 'value'){
									showError = true;
								}else if(sourceOptions.dataType === 'object' && targetOptions.dataType === 'array'){
									showError = true;
								}else if(sourceOptions.dataType === 'start' && targetOptions.dataType === 'array' && targetOptions.func === 'array' ){
									showError = true;
								}

								if(showError){
									model.removeLink(link.entity);
									const sourcePort = link.entity.getSourcePort();
									const targetPort = link.entity.getTargetPort();									
									sourcePort?.getParent().getPort('out')?.removeLink(link.entity);
									targetPort?.getParent().getPort('in')?.removeLink(link.entity);
									this.toast.error("Connection not compatible, try another node", {
										position: "bottom-center"
									});
								}

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
