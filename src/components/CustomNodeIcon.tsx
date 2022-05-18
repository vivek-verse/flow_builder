import * as React from 'react';

export interface CustomNodeIconProps {
	model: any;
	name: string;
	children:React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export class CustomNodeIcon extends React.Component<CustomNodeIconProps> {
	render() {
		return (
                <div style={{padding: "5px", backgroundColor : "#00C0FF", borderRadius : "5px", width : "30px", height : "30px", textAlign: "center", display:"table"}}>
				    {
						React.cloneElement(this.props.children, { 
							draggable : true,
							onDragStart : (event : any) => {
								event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
							}
						})
					}
                </div>	
		);
	}
}
