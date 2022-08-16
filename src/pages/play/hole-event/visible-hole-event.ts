import { MOLE_PERCENT, BOM_PERVENT } from 'constants/percent';

import { SetTimeoutRefType } from '../interface';

const hiddenItem = (button: Element, classList: DOMTokenList) => {
	classList.add('hidden');
	button.setAttribute('disabled', '');
};

const visibleItem = (button: Element, classList: DOMTokenList) => {
	classList.remove('hidden');
	button.removeAttribute('disabled');
};

const handleMoleOrBomb = (index: number, button: Element, mole: Element, bomb: Element, levelTime: number) => {
	const randomValue = Math.random();

	if (randomValue < MOLE_PERCENT) {
		const newMole = {
			[index]: setTimeout(() => hiddenItem(button, mole.classList), levelTime)
		};
		visibleItem(button, mole.classList);
		return newMole;
	}

	if (MOLE_PERCENT < randomValue && randomValue < BOM_PERVENT) {
		const newBomb = {
			[index]: setTimeout(() => hiddenItem(button, bomb.classList), levelTime)
		};
		visibleItem(button, bomb.classList);
		return newBomb;
	}

	return { [index]: 0 };
};

export const visibleHoleEvent = (
	holeIndexList: number[],
	levelTime: number,
	holesElement: HTMLTableElement | null,
	holesEventsList: SetTimeoutRefType,
	handleHolesEventList: (props: SetTimeoutRefType) => void
) => {
	const holeButtonList = holesElement?.querySelectorAll('button');

	if (holeButtonList) {
		const timeOutList = holeIndexList.map((item, index) => {
			const buttonElement = holeButtonList[item];
			const buttonElementIndex = buttonElement?.id.replace('hole-button-', '');

			const moleElement = buttonElement?.querySelector(`#mole-${buttonElementIndex}`);
			const bombElement = buttonElement?.querySelector(`#bomb-${buttonElementIndex}`);

			if (item === 0) {
				return { [index]: 0 };
			}

			if (
				moleElement?.classList.contains('hidden') === true &&
				bombElement?.classList.contains('hidden') === true
			) {
				return handleMoleOrBomb(index, buttonElement, moleElement, bombElement, levelTime);
			}

			return holesEventsList?.[index];
		});

		if (holesEventsList.length !== 0) {
			const ref = holesEventsList?.map((item, index) => {
				return { ...item, ...timeOutList[index] };
			});
			handleHolesEventList(ref);
		} else {
			handleHolesEventList(timeOutList);
		}
	}
};
