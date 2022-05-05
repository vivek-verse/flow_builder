import * as React from 'react';
import { HelperButton, HelperWorkspaceWidget } from '../helpers/HelperWorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { HelperCanvasWidget } from '../helpers/HelperCanvasWidget';

/**
 * Tests the drag on/off
 */
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
					</HelperButton>
				]}>
				<HelperCanvasWidget>
					<CanvasWidget engine={engine} />
				</HelperCanvasWidget>
			</HelperWorkspaceWidget>
		);
	}
}