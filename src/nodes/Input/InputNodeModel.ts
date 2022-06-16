import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface InputNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface InputNodeModelGenerics extends CustomNodeModelGenerics<InputNodeModelOptions> {}

export class InputNodeModel extends CustomNodeModel<InputNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: InputNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "Input",
			title: "Input",
			text: "",
			inputs: 1,
			outputs: 0,
			dataType: "value",
			func: "input",
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

	updateOptions(o : any){
		this.options = { ...this.options, ...o};
	}

}
