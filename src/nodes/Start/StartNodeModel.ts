import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface StartNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface StartNodeModelGenerics extends CustomNodeModelGenerics<StartNodeModelOptions> {}

export class StartNodeModel extends CustomNodeModel<StartNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: StartNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "Start",
			title: "Start",
			text: "",
			inputs: 0,
			outputs: 1,
			id : "start",
			dataType : "start",
			...options,
		});
	}

	updateOptions(o : any){
		this.options = {...o, ...this.options, }
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
