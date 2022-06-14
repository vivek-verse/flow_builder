import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface RuleNameValueNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface RuleNameValueNodeModelGenerics extends CustomNodeModelGenerics<RuleNameValueNodeModelOptions> {}

export class RuleNameValueNodeModel extends CustomNodeModel<RuleNameValueNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: RuleNameValueNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "RuleNameValue",
			title: "",
			text: "",
			inputs: 1,
			outputs: 0,
			dataType: "value",
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

	updateOptions(o : any){
		this.options = { ...this.options, ...o};
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
