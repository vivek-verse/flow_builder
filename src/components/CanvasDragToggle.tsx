import * as React from 'react';
import { HelperButton, HelperWorkspaceWidget } from '../helpers/HelperWorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { HelperCanvasWidget } from '../helpers/HelperCanvasWidget';

export class CanvasDragToggle extends React.Component<any, any> {
	enableDrag = () => {
		const { engine } = this.props;
		const state = engine.getStateMachine().getCurrentState();
		state.dragCanvas.config.allowDrag = true;
	};

	disableDrag = () => {
		const { engine } = this.props;
		const state = engine.getStateMachine().getCurrentState();
		state.dragCanvas.config.allowDrag = false;
	};

	render() {
		const { engine } = this.props;
		return (   
			<HelperWorkspaceWidget
				buttons={[
					<HelperButton key={1} onClick={this.enableDrag}>
						Enable canvas drag
					</HelperButton>,
					<HelperButton key={2} onClick={this.disableDrag}>
						Disable canvas drag
					</HelperButton>,
					<HelperButton key={3} onClick={this.props.autoDistribute}>Re-distribute</HelperButton>,
					<HelperButton key={4} onClick={this.props.loadFile}>Load</HelperButton>,
					<HelperButton key={5} onClick={this.props.saveFile}>Save</HelperButton>,
					<HelperButton key={6} onClick={this.props.clear}>Clear</HelperButton>,
					<HelperButton key={7} onClick={this.props.showModal}>Show Config</HelperButton>
				]}>
				<HelperCanvasWidget>
					<CanvasWidget engine={engine} />
				</HelperCanvasWidget>
			</HelperWorkspaceWidget>
		);
	}
}