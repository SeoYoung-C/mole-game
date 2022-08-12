import React, { useCallback, useRef } from 'react';
import { ButtonProps, ButtonRef } from './interface';

const Button: React.FC<ButtonProps> = props => {
	const { type = 'button', children, handleButtonElement, disabled = false, onClick, ...left } = props;
	const buttonRef = useRef<ButtonRef>(null);

	const handleClickButton = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		if (disabled) {
			e.preventDefault();
			return;
		}
		handleButtonElement?.(buttonRef.current);
		(onClick as React.MouseEventHandler<HTMLButtonElement>)?.(e);
	}, []);

	return (
		<button ref={buttonRef} type={type} onClick={handleClickButton} disabled={disabled} {...left}>
			{children}
		</button>
	);
};

export default Button;
