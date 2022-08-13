import React from 'react';
import { NumberInputProps } from './interface';

function NumberInput(props: NumberInputProps) {
	const { onChange, ...left } = props;

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		if (Number(e.currentTarget.value)) {
			onChange?.(Number(e.currentTarget.value));
		}
	};

	return <input type="number" onChange={handleChangeInput} {...left} />;
}

NumberInput.displayName = 'NumberInput';

export default NumberInput;
