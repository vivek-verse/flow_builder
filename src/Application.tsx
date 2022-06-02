import { OneToOneNodeFactory } from './nodes/OneToOne';
import createEngine, { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { ZoomCanvasAction } from './state/ZoomCanvasAction';
import { DeleteItemsAction } from '@projectstorm/react-canvas-core';
import { CloneItemsAction } from './state/CloneItemsAction';

export class Application {
	protected diagramEngine: DiagramEngine;
	protected updateFunction: Function;

	constructor(updateFunction: Function) {
		this.updateFunction = updateFunction;
		this.diagramEngine = createEngine({ registerDefaultZoomCanvasAction: false, registerDefaultDeleteItemsAction: false });
		this.newModel();
		this.registerListener();
	}

	public getModel() {
		return this.diagramEngine.getModel();
	}

	public newModel() {
		const model = new DiagramModel();
		this.diagramEngine.setModel(model);
		this.diagramEngine.getNodeFactories().registerFactory(new OneToOneNodeFactory());
		const eventBus = this.diagramEngine.getActionEventBus();
		eventBus.registerAction(new ZoomCanvasAction({ inverseZoom: true }));
		eventBus.registerAction(new DeleteItemsAction({ keyCodes: [46], modifiers: { shiftKey: true } }));
		eventBus.registerAction(new CloneItemsAction({ offset: { x: 50, y: 50 } }));
	}

	public getActiveDiagram(): DiagramModel {
		return this.diagramEngine.getModel();

	}

	public getDiagramEngine(): DiagramEngine {
		return this.diagramEngine;
	}

	public registerListener(update?: boolean): void {
		this.diagramEngine.getModel().registerListener({
			nodesUpdated: () => {
				this.updateFunction();
			},
		});
		if (update) {
			this.updateFunction();
		}
	}
}
