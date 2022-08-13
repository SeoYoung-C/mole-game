import { numberPadding } from './string';

describe('utils/string', () => {
	test('NumberPadding decimal', () => {
		const result1 = numberPadding(NaN, 3);
		expect(result1).toEqual('NaN');

		const result2 = numberPadding(1, 3);
		expect(result2).toEqual('001');

		const result3 = numberPadding(100, 3);
		expect(result3).toEqual('100');

		const result4 = numberPadding(1000, 3);
		expect(result4).toEqual('1000');

		const result5 = numberPadding(1, -1);
		expect(result5).toEqual('1');

		const result6 = numberPadding(-1, 3);
		expect(result6).toEqual('-001');

		const result7 = numberPadding(-100, 3);
		expect(result7).toEqual('-100');

		const result8 = numberPadding(-1000, 3);
		expect(result8).toEqual('-1000');

		const result9 = numberPadding(-1, -1);
		expect(result9).toEqual('-1');
	});

	test('NumberPadding binary', () => {
		const result1 = numberPadding(NaN, 3, { radix: 2 });
		expect(result1).toEqual('NaN');

		const result2 = numberPadding(1, 3, { radix: 2 });
		expect(result2).toEqual('001');

		const result3 = numberPadding(2, 3, { radix: 2 });
		expect(result3).toEqual('010');

		const result4 = numberPadding(8, 3, { radix: 2 });
		expect(result4).toEqual('1000');

		const result5 = numberPadding(1, -1, { radix: 2 });
		expect(result5).toEqual('1');

		const result6 = numberPadding(-1, 3, { radix: 2 });
		expect(result6).toEqual('-001');

		const result7 = numberPadding(-2, 3, { radix: 2 });
		expect(result7).toEqual('-010');

		const result8 = numberPadding(-8, 3, { radix: 2 });
		expect(result8).toEqual('-1000');

		const result9 = numberPadding(-1, -1, { radix: 2 });
		expect(result9).toEqual('-1');
	});
});
