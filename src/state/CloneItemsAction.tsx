import * as _ from "lodash";
import { Action, ActionEvent, BaseModel, InputType } from "@projectstorm/react-canvas-core";
import { DiagramEngine, NodeModel } from "@projectstorm/react-diagrams";

export interface CloneItemsActionOptions {
	keyCodes?: number[];
	modifiers?: {
		ctrlKey?: boolean;
		shiftKey?: boolean;
		altKey?: boolean;
		metaKey?: boolean;
	};
	offset?: { x?: number; y?: number };
}

export class CloneItemsAction extends Action<DiagramEngine> {
	constructor(options: CloneItemsActionOptions = {}) {
		const keyCodes = options.keyCodes || [68];
		const modifiers = {
			ctrlKey: true,
			shiftKey: false,
			altKey: false,
			metaKey: false,
			...options.modifiers,
		};
		const offset = {
			x: 100,
			y: 100,
			...options.offset,
		};

		super({
			type: InputType.KEY_DOWN,
			fire: (event: ActionEvent<any>) => {
				const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event.event;

				if (keyCodes.indexOf(keyCode) !== -1 && _.isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
					event.event.preventDefault();
					let model = this.engine.getModel();
					let itemMap = {};
					_.forEach(model.getSelectedEntities(), (item: BaseModel<any>) => {
						let newItem = item.clone(itemMap);
						if (!newItem) {
							return;
						}
						item.setSelected(false);
						
						if (newItem instanceof NodeModel) {
							newItem.setPosition(newItem.getX() + offset.x, newItem.getY() + offset.y);
							model.addNode(newItem);
						}
					});
					this.engine.repaintCanvas();
				}
			},
		});
	}
}
