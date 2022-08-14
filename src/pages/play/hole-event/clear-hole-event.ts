import { ClearType, SetTimeoutRefType } from '../interface';

export const clearHoleEvent = (
	type: ClearType,
	holesEventList: SetTimeoutRefType,
	holesElement?: HTMLTableElement | null
) => {
	const moleHoleSelect = holesElement?.querySelectorAll('button');

	if (type === 'button') {
		holesEventList.forEach((item, index) => {
			const html = moleHoleSelect?.[index];
			Object.keys(item).forEach(key => {
				if (typeof item[key] !== 'number' && html?.classList.contains('active')) {
					clearTimeout(item[key]);
				}
			});
		});
	} else {
		holesEventList.forEach(item => {
			Object.keys(item).forEach(key => {
				if (typeof item[key] !== 'number') {
					clearTimeout(item[key]);
				}
			});
		});
	}
};
