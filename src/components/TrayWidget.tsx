import * as React from 'react';
import styled from '@emotion/styled';

export interface TrayWidgetProps {
	children?:React.ReactNode;
}

namespace S {
	export const Tray = styled.div`
		min-width:150px;
		background: rgb(20, 20, 20);
		flex-grow: 0;
		flex-shrink: 0;
	`;
}

export class TrayWidget extends React.Component<TrayWidgetProps> {
	render() {
		return <S.Tray>{this.props.children}</S.Tray>;
	}
}
