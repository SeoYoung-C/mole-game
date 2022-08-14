import { formatDate } from '../utils/format-date';

describe('utils/format-date', () => {
	test('formatDate', () => {
		const date = new Date(0);
		expect(formatDate(date, 'YYYY')).toEqual('1970');
		expect(formatDate(date, 'YY')).toEqual('70');
		expect(formatDate(date, 'MM')).toEqual('01');
		expect(formatDate(date, 'DD')).toEqual('01');
		expect(formatDate(date, 'AA')).toEqual('AM');
		expect(formatDate(date, 'HH')).toEqual('00');
		expect(formatDate(date, 'hh')).toEqual('00');
		expect(formatDate(date, 'mm')).toEqual('00');
		expect(formatDate(date, 'ss')).toEqual('00');
		expect(formatDate(date, 'ms')).toEqual('000');

		expect(formatDate(date, 'YYYY-MM-DDThh:mm:ss.msZ')).toEqual(date.toISOString());
	});
});
