import * as React from "react";
export interface DiagramContextInterface {
    rulesList : string[];
}

export const DiagramContext = React.createContext<DiagramContextInterface | null>(null);

export const DiagramContextProvider = (props : any) => {
	const defaultDiagramContext: DiagramContextInterface = {
        rulesList : ["OneToOne", "AffectByValue", "MakeLink"]
	};
	return <DiagramContext.Provider value={defaultDiagramContext}>{props.children}</DiagramContext.Provider>;
};
