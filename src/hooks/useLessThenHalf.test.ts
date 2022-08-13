import { renderHook } from '@testing-library/react';
import useLessThenHalf, { UseLessThenHalfProps } from './useLessThenHalf';

describe('hooks/useLessThenHalf', () => {
	it('useLessThenHalf default hooks', () => {
		const result = renderHook((initialProps: UseLessThenHalfProps) => useLessThenHalf(initialProps), {
			initialProps: { row: 2, col: 2 }
		});

		expect(result).toEqual(1);
	});
});
