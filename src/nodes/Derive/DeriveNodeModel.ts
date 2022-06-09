import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface DeriveNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface DeriveNodeModelGenerics extends CustomNodeModelGenerics<DeriveNodeModelOptions> {}

export class DeriveNodeModel extends CustomNodeModel<DeriveNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: DeriveNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "Derive",
			title: "Derive",
			text: "",
			inputs: 1,
			outputs: 1,
			dataType: "object",
			func: "derive",
			...options,
		});
	}

	doClone(lookupTable: any, clone: any): void {
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
