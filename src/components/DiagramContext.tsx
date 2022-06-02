import * as React from "react";
export interface DiagramContextInterface {
    data : any[];
}

export const DiagramContext = React.createContext<DiagramContextInterface | null>(null);

export const DiagramContextProvider = (props : any) => {
	const defaultDiagramContext: DiagramContextInterface = {
        data : []
	};
	return <DiagramContext.Provider value={defaultDiagramContext}>{props.children}</DiagramContext.Provider>;
};
