import { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UseStore from 'stores';

import useTimer from 'hooks/useTimer';

import { AppPaths } from 'constants/app-paths';
import { visibleHoleEvent } from './hole-event/visible-hole-event';
import { clearHoleEvent } from './hole-event/clear-hole-event';
import { SetTimeoutRefType } from './interface';

const usePlay = () => {
	const navigate = useNavigate();

	const holesAreaElementRef = useRef<HTMLTableElement>(null);
	const holesEventListRef = useRef<SetTimeoutRefType>([]);

	const { col, holes, mole, score, mutateScoreStateDecrease, mutateScoreStateIncrease, mutateClearScoreState } =
		UseStore(state => state);

	const [levelTime, setLevelTime] = useState<number>(1500);

	const handleHolesEventList = (data: SetTimeoutRefType) => {
		holesEventListRef.current = data;
	};

	const handleRendomHole = useCallback(() => {
		const eventHoleList = holes.flat().slice();

		let moleNumber = 0;
		while (moleNumber < mole) {
			const selectMoleIndex = Math.floor(Math.random() * eventHoleList.length);
			eventHoleList.splice(selectMoleIndex, 1, selectMoleIndex);
			moleNumber += 1;
		}

		visibleHoleEvent(
			eventHoleList,
			levelTime,
			holesAreaElementRef.current,
			holesEventListRef.current,
			handleHolesEventList
		);
	}, [mole, holes, levelTime]);

	const { time, start, end, pouse } = useTimer(60, levelTime, handleRendomHole);
	const [startGame, setStartGame] = useState<boolean>(false);
	const onClickStart = useCallback(() => {
		start();
		setStartGame(true);
	}, [start]);

	const [parseGame, setParseGame] = useState<boolean>(false);
	const onClickPouse = useCallback(() => {
		pouse();
		setParseGame(true);
	}, [pouse]);

	const onClickStop = useCallback(() => {
		end();
		mutateClearScoreState();
		setParseGame(false);
		setStartGame(false);
		navigate(AppPaths.ready.path);
	}, [end, navigate, mutateClearScoreState]);

	const onClickRestart = useCallback(() => {
		start();
		setParseGame(false);
	}, [start]);

	const handleButtonElement = useCallback(
		(buttonRef: HTMLButtonElement | null) => {
			const buttonElementIndex = buttonRef?.id.replace('hole-button-', '');
			const moleElementClassList = buttonRef?.querySelector(`#mole-${buttonElementIndex}`)?.classList;
			const bombElementClassList = buttonRef?.querySelector(`#bomb-${buttonElementIndex}`)?.classList;

			if (buttonRef) {
				buttonRef.classList.add('active');
				if (!moleElementClassList?.contains('hidden')) {
					mutateScoreStateIncrease();
					moleElementClassList?.add('hidden');
				}
				if (!bombElementClassList?.contains('hidden')) {
					mutateScoreStateDecrease();
					bombElementClassList?.add('hidden');
				}

				buttonRef.setAttribute('disabled', '');
			}
			clearHoleEvent('button', holesEventListRef.current, holesAreaElementRef.current);
		},
		[mutateScoreStateDecrease, mutateScoreStateIncrease]
	);

	useEffect(() => {
		if (time === 0) {
			clearHoleEvent('all', holesEventListRef.current);
			holesEventListRef.current = [];
			end();
			navigate(AppPaths.result.path);
		}
		switch (time) {
			case 45:
				setLevelTime(1250);
				break;

			case 30:
				setLevelTime(1000);
				break;

			case 15:
				setLevelTime(500);
				break;

			default:
				break;
		}
	}, [time, end, navigate]);

	return {
		holesAreaElementRef,

		time,
		score,
		col,
		holes,
		startGame,
		parseGame,

		handleButtonElement,

		onClickStart,
		onClickPouse,
		onClickRestart,
		onClickStop
	};
};

export default usePlay;
