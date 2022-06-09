import * as _ from "lodash";
import { NodeModel, NodeModelGenerics, PortModelAlignment } from "@projectstorm/react-diagrams-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { BasePositionModelOptions, DeserializeEvent } from "@projectstorm/react-canvas-core";
import { DiagramContextInterface } from "../../components/DiagramContext";

export interface CustomNodeModelOptions extends BasePositionModelOptions {
	title?: string;
	editableTitle?: boolean;
	color?: string;
	inputs?: number;
	outputs?: number;
	func?: string,
    dataType?: string,
}

export interface CustomNodeModelGenerics<T extends CustomNodeModelOptions> extends NodeModelGenerics {
	OPTIONS: T;
}

export class CustomNodeModel<T extends CustomNodeModelGenerics<CustomNodeModelOptions>> extends NodeModel<T> {
	protected portsIn: DefaultPortModel[];
	protected portsOut: DefaultPortModel[];

	constructor(title: string, color: string);
	constructor(options?: T);
	constructor(options: any = {}, color?: string) {
		if (typeof options === "string") {
			options = {
				title: options,
				color: color,
				inputs: 0,
				outputs: 0,
			};
		}
		super({
			type: "custom",
			title: "Untitled",
			color: "rgb(0,192,255)",
			...options,
		});
		this.portsOut = [];
		this.portsIn = [];
	}

	setupPorts(): void {
		_.range(0, this.options.inputs).forEach((i) => {
			this.addInPort("❯", i);
		});
		_.range(0, this.options.outputs).forEach((i) => {
			this.addOutPort("❯", i);
		});
	}

	doClone(lookupTable: any, clone: any): void {
		clone.portsIn = [];
		clone.portsOut = [];
		super.doClone(lookupTable, clone);
	}

	removePort(port: DefaultPortModel): void {
		super.removePort(port);
		if (port.getOptions().in) {
			this.portsIn.splice(this.portsIn.indexOf(port), 1);
		} else {
			this.portsOut.splice(this.portsOut.indexOf(port), 1);
		}
	}

	addPort<T extends DefaultPortModel>(port: T): T {
		super.addPort(port);
		if (port.getOptions().in) {
			if (this.portsIn.indexOf(port) === -1) {
				this.portsIn.push(port);
			}
		} else {
			if (this.portsOut.indexOf(port) === -1) {
				this.portsOut.push(port);
			}
		}
		return port;
	}

	addInPort(label: string, index?: number): DefaultPortModel {
		let id = 'in';
		const p = new DefaultPortModel({
			in: true,
			name: id,
			label: label,
			alignment: PortModelAlignment.LEFT,
		});
		this.portsIn.push(p);
		return this.addPort(p);
	}

	addOutPort(label: string, index?: number): DefaultPortModel {
		let id = 'out';
		const p = new DefaultPortModel({
			in: false,
			name: id,
			label: label,
			alignment: PortModelAlignment.RIGHT,
		});
		this.portsOut.push(p);
		return this.addPort(p);
	}

	deserialize(event: DeserializeEvent<this>) {
		_.remove(event.data.ports, (port : any) => {
			return event.data.portsInOrder.indexOf(port.id) === -1 && event.data.portsOutOrder.indexOf(port.id) === -1;
		});
		super.deserialize(event);
		this.options.title = event.data.title;
		this.options.color = event.data.color;
		this.portsIn = _.map(event.data.portsInOrder, (id) => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, (id) => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
	}

	serialize(): any {
		return {
			...super.serialize(),
			title: this.options.title,
			color: this.options.color,
			portsInOrder: _.map(this.portsIn, (port) => {
				return port.getID();
			}),
			portsOutOrder: _.map(this.portsOut, (port) => {
				return port.getID();
			}),
		};
	}

	getInPorts(): DefaultPortModel[] {
		return this.portsIn;
	}

	getOutPorts(): DefaultPortModel[] {
		return this.portsOut;
	}

	fix(context: DiagramContextInterface) {}
}
