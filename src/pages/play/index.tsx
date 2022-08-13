import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'assets/svgs';
import { Button } from 'components';

import { UseReadyStore } from 'stores/ready';
import { UsePlayStore } from 'stores/play';

import useTimer from 'hooks/useTimer';

import { AppPaths } from 'constants/app-paths';
import { visibleEventControl } from './visible-event-cotrol';
import { ClearType, SetTimeoutRefType } from './interface';

const ReturnColGroup = (col: number) => {
	const result = [];
	for (let i = 1; i <= col; i += 1) {
		result.push(<col key={`${i}`} />);
	}
	return result;
};

function Play() {
	const navigate = useNavigate();

	const componentRef = React.useRef<HTMLTableElement>(null);
	const holeSetTimeoutRef = React.useRef<SetTimeoutRefType>([]);

	const { col, holes, mole } = UseReadyStore();
	const { score, handleDecreaseScore, handleIncreaseScore, clearPlayState } = UsePlayStore();

	const [startGame, setStartGame] = React.useState<boolean>(false);
	const [parseGame, setParseGame] = React.useState<boolean>(false);
	const [levelTime, setLevelTime] = React.useState<number>(1500);

	const handleHoleSettimeout = (data: SetTimeoutRefType) => {
		holeSetTimeoutRef.current = data;
	};

	const visibleRendomHoleList = React.useCallback((): void => {
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
			componentRef.current,
			holeSetTimeoutRef.current,
			handleHoleSettimeout
		);
	}, [mole, holes, levelTime]);

	const { time, start, end, pouse } = useTimer(60, levelTime, visibleRendomHoleList);

	const onClickStart = React.useCallback(() => {
		start();
		setStartGame(true);
	}, [start]);

	const onClickPouse = React.useCallback(() => {
		pouse();
		setParseGame(true);
	}, [pouse]);

	const onClickStop = React.useCallback(() => {
		end();
		setParseGame(false);
		setStartGame(false);
		clearPlayState();
		navigate(AppPaths.ready.path);
	}, [end, navigate, clearPlayState]);

	const onClickRestart = React.useCallback(() => {
		start();
		setParseGame(false);
	}, [start]);

	const clearTimeOut = (type: ClearType) => {
		const timeOutCurrent = holeSetTimeoutRef.current;
		const moleHoleSelect = componentRef?.current?.querySelectorAll('button');

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

	const handleButtonElement = React.useCallback(
		(buttonRef: HTMLButtonElement | null) => {
			const buttonElementIndex = buttonRef?.id.replace('hole-button-', '');
			const moleElement = buttonRef?.querySelector(`#mole-${buttonElementIndex}`);
			const bombElement = buttonRef?.querySelector(`#bomb-${buttonElementIndex}`);

			if (buttonRef !== undefined && buttonRef !== null) {
				buttonRef.classList.add('active');
				if (!moleElement?.classList.contains('hidden')) {
					handleIncreaseScore();
					moleElement?.classList.add('hidden');
				}
				if (!bombElement?.classList.contains('hidden')) {
					handleDecreaseScore();
					bombElement?.classList.add('hidden');
				}
				buttonRef.setAttribute('disabled', '');
			}
			clearTimeOut('button');
		},
		[handleDecreaseScore, handleIncreaseScore]
	);

	React.useEffect(() => {
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

	return (
		<main>
			<section>
				<div className="play-content__left">남은시간: {time}</div>
				<div className="play-content__right">점수: {score}</div>
			</section>
			<table ref={componentRef}>
				<colgroup>{ReturnColGroup(col)}</colgroup>
				<tbody>
					{holes.map((row, index) => (
						<tr key={`row-${index.toString()}`}>
							{row.map((_, colIndex) => (
								<td className="hole" key={`hole-${index.toString()}-${colIndex.toString()}`}>
									<Button
										id={`hole-button-${index}-${colIndex}`}
										className="hole-button"
										handleButtonElement={handleButtonElement}
										style={{ width: '80px', height: '80px' }}>
										<Icon
											id={`mole-${index}-${colIndex}`}
											name="mole"
											width="80px"
											height="80px"
											className="mole hidden"
										/>
										<Icon id={`bomb-${index}-${colIndex}`} name="bomb" className="bomb hidden" />
										<Icon name="holeWave" className="front" />
										<Icon name="holeBottom" className="bottom" />
									</Button>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{startGame === false ? (
				<Button onClick={onClickStart}>시작하기</Button>
			) : (
				<>
					{parseGame === false ? (
						<Button onClick={onClickPouse}>잠시 멈춤</Button>
					) : (
						<Button onClick={onClickRestart}>재개하기</Button>
					)}
					<Button onClick={onClickStop}>그만 하기</Button>
				</>
			)}
		</main>
	);
}

export default Play;
