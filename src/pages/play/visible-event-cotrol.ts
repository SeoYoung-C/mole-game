import { MOLE_PERCENT, BOM_PERVENT } from 'constants/percent';

import { SetTimeoutRefType } from './interface';

const mutateTimeout = (button: Element, classList: DOMTokenList) => {
	classList.add('hidden');
	button.setAttribute('disabled', '');
};

const mutateTimeIn = (button: Element, classList: DOMTokenList) => {
	classList.remove('hidden');
	button.removeAttribute('disabled');
};

const hiddenHoleControl = (index: number, button: Element, mole: Element, bomb: Element, levelTime: number) => {
	const randomValue = Math.random();

	if (randomValue < MOLE_PERCENT) {
		const newMole = {
			[index]: setTimeout(() => mutateTimeout(button, mole.classList), levelTime)
		};
		mutateTimeIn(button, mole.classList);
		return newMole;
	}

	if (MOLE_PERCENT < randomValue && randomValue < BOM_PERVENT) {
		const newBomb = {
			[index]: setTimeout(() => mutateTimeout(button, bomb.classList), levelTime)
		};
		mutateTimeIn(button, bomb.classList);
		return newBomb;
	}

	return { [index]: 0 };
};

export const visibleEventControl = (
	holeIndexList: number[],
	levelTime: number,
	componentRef: HTMLTableElement | null,
	holeSettimeoutRef: SetTimeoutRefType,
	handleHoleSettimeout: (props: SetTimeoutRefType) => void
) => {
	const holeButtonList = componentRef?.querySelectorAll('button');

	if (holeButtonList) {
		const timeOutList = holeIndexList.map((item, index) => {
			const buttonElement = holeButtonList[item];
			const buttonElementIndex = holeButtonList[item]?.id.replace('hole-button-', '');

			const mole = buttonElement?.querySelector(`#mole-${buttonElementIndex}`);
			const bomb = buttonElement?.querySelector(`#bomb-${buttonElementIndex}`);

			if (item === 0) {
				return { [index]: 0 };
			}

			if (mole?.classList.contains('hidden') && bomb?.classList.contains('hidden')) {
				return hiddenHoleControl(index, buttonElement, mole, bomb, levelTime);
			}

			return holeSettimeoutRef?.[index];
		});

		if (holeSettimeoutRef.length !== 0) {
			const ref = holeSettimeoutRef?.map((item, index) => {
				return { ...item, ...timeOutList[index] };
			});
			handleHoleSettimeout(ref);
		} else {
			handleHoleSettimeout(timeOutList);
		}
	}
};
