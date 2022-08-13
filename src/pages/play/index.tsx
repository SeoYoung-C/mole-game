import React from 'react';

import Icon from 'assets/svgs';
import { Button } from 'components';

import { UseReadyStore } from 'stores/ready';

import useTimer from 'hooks/useTimer';

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
	const componentRef = React.useRef<HTMLTableElement>(null);
	const holeSetTimeoutRef = React.useRef<SetTimeoutRefType>([]);

	const { col, holes, mole } = UseReadyStore();

	const [startGame, setStartGame] = React.useState<boolean>(false);
	const [parseGame, setParseGame] = React.useState<boolean>(false);
	const [levelTime, setLevelTime] = React.useState<number>(1500);

	const visibleRendomHoleList = (): void => {
		const showMoleList = holes.flat();
		const eventHoleList = showMoleList.slice();
		let moleNumber = 0;
		while (moleNumber < mole) {
			const selectMoleIndex = Math.floor(Math.random() * showMoleList.length);
			eventHoleList.splice(selectMoleIndex, 1, selectMoleIndex);
			moleNumber += 1;
		}

		visibleEventControl(eventHoleList, levelTime, componentRef.current, holeSetTimeoutRef.current);
	};

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
	}, [end]);

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
				for (const [_, value] of Object.entries(item)) {
					if (typeof value !== 'number' && html?.classList.contains('active')) {
						clearTimeout(value);
					}
				}
			});
		} else {
			timeOutCurrent.forEach(item => {
				for (const [, value] of Object.entries(item)) {
					if (typeof value !== 'number') {
						clearTimeout(value);
					}
				}
			});
			holeSetTimeoutRef.current = [];
		}
	};

	const handleButtonElement = React.useCallback((buttonRef: HTMLButtonElement | null) => {
		const buttonElementIndex = buttonRef?.id.replace('hole-button-', '');
		const mole = buttonRef?.querySelector(`#mole-${buttonElementIndex}`);
		const bomb = buttonRef?.querySelector(`#bomb-${buttonElementIndex}`);
		console.log(buttonRef);
		if (buttonRef !== undefined && buttonRef !== null) {
			buttonRef.classList.add('active');
			if (!mole?.classList.contains('hidden')) {
				// 'plus';
				mole?.classList.add('hidden');
			}
			if (!bomb?.classList.contains('hidden')) {
				// 'minus;
				bomb?.classList.add('hidden');
			}
			buttonRef.setAttribute('disabled', '');
		}
		clearTimeOut('button');
	}, []);

	React.useEffect(() => {
		if (time === 0) {
			clearTimeOut('all');
			end();
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
	}, [time]);

	return (
		<main>
			<table ref={componentRef}>
				<colgroup>{ReturnColGroup(col)}</colgroup>
				<tbody>
					{holes.map((row, index) => (
						<tr key={`row-${index}`}>
							{row.map((_, colIndex) => (
								<td className="hole" key={`hole-${index}-${colIndex}`}>
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
										{/* <Icon name="holeWave" className="front" />
										<Icon name="holeBottom" className="bottom" /> */}
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
