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

	// visibleHoleEvent 함수 내부에서 두더지가 나타나거나, 폭탄이 나타난 array 반환시 holesEventListRef에 해당 값을 저장
	const handleHolesEventList = (data: SetTimeoutRefType) => {
		holesEventListRef.current = data;
	};

	// 특정 구멍에서 폭탄 또는 두더지가 나타날지 여부를 결정
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

	// 게임 시작 버튼 클릭시
	const [startGame, setStartGame] = useState<boolean>(false);
	const onClickStart = useCallback(() => {
		start();
		setStartGame(true);
	}, [start]);

	// 일시 정지 버튼 클릭시
	const [parseGame, setParseGame] = useState<boolean>(false);
	const onClickPouse = useCallback(() => {
		pouse();
		setParseGame(true);
	}, [pouse]);

	// 그만 하기 버튼 클릭시
	const onClickStop = useCallback(() => {
		end();
		mutateClearScoreState();
		setParseGame(false);
		setStartGame(false);
		navigate(AppPaths.ready.path);
	}, [end, navigate, mutateClearScoreState]);

	// 재개하기 버튼 클릭시
	const onClickRestart = useCallback(() => {
		start();
		setParseGame(false);
	}, [start]);

	// 게임이 끝날 경우
	const handleGamveOver = useCallback(() => {
		clearHoleEvent('all', holesEventListRef.current);
		end();
		holesEventListRef.current = [];
		navigate(AppPaths.result.path);
	}, [end, navigate]);

	// 두더지 또는 폭탄 클릭시 Click event가 발생한 버튼의 Element를 전달받아 폭탄일 경우 -1점, 두더지일 경우 + 1점
	const handleButtonElement = useCallback(
		(targetElement: HTMLButtonElement | null) => {
			const buttonElementIndex = targetElement?.id.replace('hole-button-', '');
			const moleElementClassList = targetElement?.querySelector(`#mole-${buttonElementIndex}`)?.classList;
			const bombElementClassList = targetElement?.querySelector(`#bomb-${buttonElementIndex}`)?.classList;

			targetElement?.classList.add('active');
			targetElement?.setAttribute('disabled', '');

			if (!moleElementClassList?.contains('hidden')) {
				mutateScoreStateIncrease();
				moleElementClassList?.add('hidden');
			}

			if (!bombElementClassList?.contains('hidden')) {
				if (score === 0) {
					handleGamveOver();
					return;
				}
				mutateScoreStateDecrease();
				bombElementClassList?.add('hidden');
			}

			clearHoleEvent('button', holesEventListRef.current, holesAreaElementRef.current);
		},
		[mutateScoreStateDecrease, score, handleGamveOver, mutateScoreStateIncrease]
	);

	// 게임 timer가 바뀔때 마다 게임 Level을 핸들링 하거나, 0초일 경우 게임 종료
	useEffect(() => {
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

			case 0:
				handleGamveOver();
				break;

			default:
				break;
		}
	}, [time, handleGamveOver]);

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
