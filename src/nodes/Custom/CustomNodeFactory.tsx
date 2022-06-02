import { CustomNodeModel, CustomNodeModelGenerics, CustomNodeModelOptions } from "./CustomNodeModel";
import { AbstractReactFactory, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { CustomNodeWidget } from "./CustomNodeWidget";

export abstract class CustomNodeFactory<T extends CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>> extends AbstractReactFactory<
	T,
	DiagramEngine
> {
	public options: { id: string; name: string; color: string };

	constructor(id: string, name: string, color: string) {
		super(id);
		this.options = { id: id, name: name, color: color };
	}

  generateReactWidget(event : GenerateWidgetEvent<CustomNodeModel<CustomNodeModelGenerics<CustomNodeModelOptions>>>): JSX.Element {
    return <CustomNodeWidget engine={this.engine} node={event.model} />;
  }

}
