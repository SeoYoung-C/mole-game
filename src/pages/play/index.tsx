import React from 'react';

import Icon from 'assets/svgs';
import { Button } from 'components';
import usePlay from './hook';

const ReturnColGroup = (col: number) => {
	const result = [];
	for (let i = 1; i <= col; i += 1) {
		result.push(<col key={`${i}`} />);
	}
	return result;
};

function Play() {
	const {
		time,
		score,
		componentRef,
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
