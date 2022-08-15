import { useEffect, useState } from 'react';

export interface UseLessThenHalfProps {
	row: number;
	col: number;
}

export const calculatorLessThenHalf = (row: number, col: number) => {
	const divide = (row * col) / 2;
	const value = Number.isInteger(divide) === true ? divide - 1 : Math.floor(divide);
	return value;
};

const useLessThenHalf = (props: UseLessThenHalfProps) => {
	const { row, col } = props;
	const [half, setHalf] = useState<number>(1);

	useEffect(() => {
		const value = calculatorLessThenHalf(row, col);
		setHalf(value);
	}, [row, col]);

	return half;
};

export default useLessThenHalf;
