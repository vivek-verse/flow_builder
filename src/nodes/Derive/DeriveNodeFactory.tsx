import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { CustomNodeFactory } from '../Custom/CustomNodeFactory';
import { DeriveNodeModel } from './DeriveNodeModel';
import { DeriveNodeWidget } from './DeriveNodeWidget';
export class DeriveNodeFactory extends CustomNodeFactory<DeriveNodeModel>{
	constructor() {
		super("Derive", "Derive", "#19e0e7");
	}

  generateReactWidget(event : GenerateWidgetEvent<DeriveNodeModel>): JSX.Element {
    return <DeriveNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event : any): DeriveNodeModel {
	return new DeriveNodeModel({ color: this.options.color });
  }

}

export const DeriveFactory = new DeriveNodeFactory();
