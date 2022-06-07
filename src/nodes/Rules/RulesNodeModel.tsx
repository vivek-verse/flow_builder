import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface RulesNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface RulesNodeModelGenerics extends CustomNodeModelGenerics<RulesNodeModelOptions> {}

export class RulesNodeModel extends CustomNodeModel<RulesNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: RulesNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "Rules",
			title: "Rules",
			text: "",
			inputs: 1,
			outputs: 1,
			dataType: "array",
			func: "rules",
			...options,
		});
	}

	doClone(lookupTable: {}, clone: any): void {
		super.doClone(lookupTable, clone);
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.text = event.data.text;
	}

	serialize(): any {
		return {
			...super.serialize(),
			text: this.options.text,
		};
	}

	getInPorts(): DefaultPortModel[] {
		return this.portsIn;
	}

	getOutPorts(): DefaultPortModel[] {
		return this.portsOut;
	}

	getText(): string {
		return this.options.text as string;
	}
}
