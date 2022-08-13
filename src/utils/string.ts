interface NumberPaddingOptions {
	radix?: number;
}

export function numberPadding(n: number, width: number, options?: NumberPaddingOptions): string {
	const { radix = 10 } = options ?? {};

	if (Number.isNaN(n)) {
		return `${n}`;
	}

	const abs = Math.abs(n);
	const isUnder = n < 0;

	const result = abs.toString(radix);
	return (
		(isUnder ? '-' : '') +
		(result.length >= width ? result : new Array(width - result.length + 1).join('0') + result)
	);
}
