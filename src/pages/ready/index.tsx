import React from 'react';

import { NumberInput, Button } from 'components';

import useReady from './useReady';

function Ready() {
	const { row, col, mole, maxMole, onChangeRow, onChangeCol, onChangeMole, onClickStart, onClickRanking } =
		useReady();

	return (
		<main className="ready">
			<h1 className="ready__title">Wake a mole!</h1>
			<table className="ready__table">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>
				<tbody>
					<tr>
						<td className="left-text">행</td>
						<td className="right-text">
							<NumberInput min={2} max={6} value={row} onChange={onChangeRow} />
						</td>
					</tr>
					<tr>
						<td className="left-text">열</td>
						<td className="right-text">
							<NumberInput min={2} max={6} value={col} onChange={onChangeCol} />
						</td>
					</tr>
					<tr>
						<td className="left-text">두더지</td>
						<td className="right-text">
							<NumberInput min={1} max={maxMole} value={mole} onChange={onChangeMole} />
						</td>
					</tr>
				</tbody>
			</table>
			<section className="ready__button-wrap">
				<Button onClick={onClickStart}>시작</Button>
				<Button onClick={onClickRanking}>랭킹</Button>
			</section>
		</main>
	);
}

export default Ready;
