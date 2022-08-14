import React from 'react';

import Icon from 'assets/icons';
import { Button } from 'components';
import usePlay from './usePlay';

function ReturnColGroup(col: number) {
	const result = [];
	for (let i = 1; i <= col; i += 1) {
		result.push(<col key={`${i}`} />);
	}
	return result;
}

function Play() {
	const {
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
	} = usePlay();

	return (
		<main className="play">
			<section className="play__header">
				<span className="time">남은시간 : {time}</span>
				<span className="score">점수 : {score}</span>
			</section>
			<table ref={holesAreaElementRef} className="play__content">
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
										disabled={!startGame || parseGame}>
										<Icon name="holeWave" className="back" />
										<Icon id={`mole-${index}-${colIndex}`} name="mole" className="mole hidden" />
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
			<section className="play__button-wrap">
				{startGame === false ? (
					<Button onClick={onClickStart} className="play__button-wrap__start">
						시작하기
					</Button>
				) : (
					<>
						{parseGame === false ? (
							<Button onClick={onClickPouse} className="play__button-wrap__pouse">
								잠시 멈춤
							</Button>
						) : (
							<Button onClick={onClickRestart} className="play__button-wrap__restart">
								재개하기
							</Button>
						)}
						<Button onClick={onClickStop} className="play__button-wrap__stop">
							그만 하기
						</Button>
					</>
				)}
			</section>
		</main>
	);
}

export default Play;
