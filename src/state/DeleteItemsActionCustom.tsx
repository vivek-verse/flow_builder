import { Action, InputType } from "@projectstorm/react-canvas-core"
import * as _ from 'lodash';
import { StartNodeModel } from "../nodes/Start";

export interface DeleteItemsActionCustomOptions {
	keyCodes?: number[];
	modifiers?: {
		ctrlKey?: boolean;
		shiftKey?: boolean;
		altKey?: boolean;
		metaKey?: boolean;
	};
}

export class DeleteItemsActionCustom extends Action {
	constructor(options: DeleteItemsActionCustomOptions = {}) {
		const keyCodes = options.keyCodes || [46, 8];
		const modifiers = {
			ctrlKey: false,
			shiftKey: false,
			altKey: false,
			metaKey: false,
			...options.modifiers
		};

		super({
			type: InputType.KEY_DOWN,
			fire: (event: any) => {
				const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event.event;
				if (keyCodes.indexOf(keyCode) !== -1 && _.isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
					_.forEach(this.engine.getModel().getSelectedEntities(), (model) => {
						if(!(model instanceof StartNodeModel)){
							if (!model.isLocked()) {
								model.remove();
							}
						}
					});
					this.engine.repaintCanvas();
				}
			}
		});
	}
}
