import React from 'react';

export type ButtonRef = HTMLButtonElement | null;

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	handleButtonElement?: (ref: ButtonRef) => void;
}
