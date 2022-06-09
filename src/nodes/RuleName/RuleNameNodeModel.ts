import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { DeserializeEvent } from "@projectstorm/react-canvas-core";
import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "../Custom";

export interface RuleNameNodeModelOptions extends CustomNodeModelOptions {
	text?: string;
}

export interface RuleNameNodeModelGenerics extends CustomNodeModelGenerics<RuleNameNodeModelOptions> {}

export class RuleNameNodeModel extends CustomNodeModel<RuleNameNodeModelGenerics> {
	constructor(name: string, text: string);
	constructor(options?: RuleNameNodeModelOptions);
	constructor(options: any = {}, text?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				text: text,
			};
		}
		super({
			type: "RuleName",
			title: "RuleName",
			text: "",
			inputs: 1,
			outputs: 1,
			dataType: "string",
			func: "ruleName",
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
