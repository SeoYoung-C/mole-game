import { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseReadyStore } from 'stores/ready';
import { UsePlayStore } from 'stores/play';

import useTimer from 'hooks/useTimer';

import { AppPaths } from 'constants/app-paths';
import { visibleEventControl } from './visible-event-cotrol';
import { ClearType, SetTimeoutRefType } from './interface';

const usePlay = () => {
	const navigate = useNavigate();

	const gameContentAreaRef = useRef<HTMLTableElement>(null);
	const holeSetTimeoutRef = useRef<SetTimeoutRefType>([]);

	const { col, holes, mole } = UseReadyStore();
	const { score, decreaseScore, increaseScore, clearPlayState } = UsePlayStore();

	const [levelTime, setLevelTime] = useState<number>(1500);
	const handleHoleSettimeout = (data: SetTimeoutRefType) => {
		holeSetTimeoutRef.current = data;
	};
	const visibleRendomHoleList = useCallback((): void => {
		const showMoleList = holes.flat();
		const eventHoleList = showMoleList.slice();
		let moleNumber = 0;
		while (moleNumber < mole) {
			const selectMoleIndex = Math.floor(Math.random() * showMoleList.length);
			eventHoleList.splice(selectMoleIndex, 1, selectMoleIndex);
			moleNumber += 1;
		}

		visibleEventControl(
			eventHoleList,
			levelTime,
			gameContentAreaRef.current,
			holeSetTimeoutRef.current,
			handleHoleSettimeout
		);
	}, [mole, holes, levelTime]);

	const { time, start, end, pouse } = useTimer(60, levelTime, visibleRendomHoleList);
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
		clearPlayState();
		setParseGame(false);
		setStartGame(false);
		navigate(AppPaths.ready.path);
	}, [end, navigate, clearPlayState]);

	const onClickRestart = useCallback(() => {
		start();
		setParseGame(false);
	}, [start]);

	const clearTimeOut = (type: ClearType) => {
		const timeOutCurrent = holeSetTimeoutRef.current;
		const moleHoleSelect = gameContentAreaRef?.current?.querySelectorAll('button');

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
			holeSetTimeoutRef.current = [];
		}
	};

	const handleButtonElement = useCallback(
		(buttonRef: HTMLButtonElement | null) => {
			const buttonElementIndex = buttonRef?.id.replace('hole-button-', '');
			const moleElement = buttonRef?.querySelector(`#mole-${buttonElementIndex}`);
			const bombElement = buttonRef?.querySelector(`#bomb-${buttonElementIndex}`);

			if (buttonRef !== undefined && buttonRef !== null) {
				buttonRef.classList.add('active');
				if (!moleElement?.classList.contains('hidden')) {
					increaseScore();
					moleElement?.classList.add('hidden');
				}
				if (!bombElement?.classList.contains('hidden')) {
					decreaseScore();
					bombElement?.classList.add('hidden');
				}
				buttonRef.setAttribute('disabled', '');
			}
			clearTimeOut('button');
		},
		[decreaseScore, increaseScore]
	);

	useEffect(() => {
		if (time === 0) {
			clearTimeOut('all');
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
		time,
		score,
		gameContentAreaRef,
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
