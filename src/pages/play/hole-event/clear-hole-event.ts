import { ClearType, SetTimeoutRefType } from '../interface';

export const clearHoleEvent = (
	type: ClearType,
	timeOutCurrent: SetTimeoutRefType,
	componentRef?: HTMLTableElement | null
) => {
	const moleHoleSelect = componentRef?.querySelectorAll('button');

	if (type === 'button') {
		timeOutCurrent.forEach((item, index) => {
			const html = moleHoleSelect?.[index];
			Object.keys(item).forEach(key => {
				if (typeof item[key] !== 'number' && html?.classList.contains('active')) {
					clearTimeout(item[key]);
				}
			});
		});
	} else {
		timeOutCurrent.forEach(item => {
			Object.keys(item).forEach(key => {
				if (typeof item[key] !== 'number') {
					clearTimeout(item[key]);
				}
			});
		});
	}
};
