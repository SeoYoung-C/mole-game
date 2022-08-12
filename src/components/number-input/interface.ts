import React from 'react';

export interface NumberInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'> {
	onChange?: (value: number) => void;
}
