import { numberPadding } from './string';

interface FormatDateValues<T> {
	YYYY?: T;
	MM?: T;
	DD?: T;
	HH?: T;
	AA?: T;
	hh?: T;
	mm?: T;
	ss?: T;
	ms?: T;
}

interface FormatDateOptions {
	isLocale?: boolean;
	defaultPadding?: number;
	padding?: FormatDateValues<number>;
}
export function formatDate(date: string | number | Date, format: string, option?: FormatDateOptions) {
	const { isLocale = false, defaultPadding = 2, padding } = option ?? {};
	const dateObj = new Date(date);

	if (Number.isNaN(dateObj.getTime())) {
		throw new Error(`Invalid date (${date})`);
	}

	const splitted = (() => {
		if (!isLocale) {
			return dateObj.toISOString().split(/[-T:.Z]/g);
		}

		return [
			dateObj.getFullYear(),
			dateObj.getMonth() + 1,
			dateObj.getDate(),
			dateObj.getHours(),
			dateObj.getMinutes(),
			dateObj.getSeconds(),
			dateObj.getMilliseconds()
		];
	})();

	const YYYY = numberPadding(Number(splitted[0] || 0), padding?.YYYY ?? 4);
	const YY = `${splitted}`.slice(2, 4);
	const MM = numberPadding(Number(splitted[1] || 0), padding?.MM ?? defaultPadding);
	const DD = numberPadding(Number(splitted[2] || 1), padding?.DD ?? defaultPadding);
	const AA = Number(splitted[3] || 0) < 12 ? 'AM' : 'PM';
	const HH = numberPadding(Number(splitted[3] || 0), padding?.hh ?? defaultPadding);
	const hh = numberPadding(Number(splitted[3] || 0) % 12, padding?.hh ?? defaultPadding);
	const mm = numberPadding(Number(splitted[4] || 0), padding?.mm ?? defaultPadding);
	const ss = numberPadding(Number(splitted[5] || 0), padding?.ss ?? defaultPadding);
	const ms = numberPadding(Number(splitted[6] || 0), padding?.ms ?? 3);

	return format
		.replace(/YYYY/g, YYYY)
		.replace(/YY/g, YY)
		.replace(/MM/g, MM)
		.replace(/DD/g, DD)
		.replace(/AA/g, AA)
		.replace(/HH/g, HH)
		.replace(/hh/g, hh)
		.replace(/mm/g, mm)
		.replace(/ss/g, ss)
		.replace(/ms/g, ms);
}
