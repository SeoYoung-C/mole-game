import React, { useCallback, useRef } from 'react';
import { ButtonProps, ButtonRef } from './interface';

function Button(props: ButtonProps) {
	const { type = 'button', children, handleButtonElement, disabled = false, onClick, ...left } = props;
	const buttonRef = useRef<ButtonRef>(null);

	const handleClickButton = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.stopPropagation();
			if (disabled) {
				e.preventDefault();
				return;
			}
			handleButtonElement?.(buttonRef.current);
			(onClick as React.MouseEventHandler<HTMLButtonElement>)?.(e);
		},
		[disabled, handleButtonElement, onClick]
	);

	return (
		<button ref={buttonRef} type={type ?? 'button'} onClick={handleClickButton} disabled={disabled} {...left}>
			{children}
		</button>
	);
}
Button.displayName = 'Button';

export default Button;
