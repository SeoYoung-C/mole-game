import React from 'react';

import { useNavigate } from 'react-router-dom';

import { NumberInput, Button } from 'components';

import useLessThenHalf from 'hooks/less-than-half';

import { UseReadyStore } from 'stores/ready';
import { AppPaths } from 'constants/app-paths';

function Ready() {
	const navigate = useNavigate();

	const { row, col, mole, handleRowState, handleColState, handleMoleState, handleHolesState } = UseReadyStore();
	const maxMole = useLessThenHalf({ row, col });

	const onClickStart = React.useCallback(() => {
		const newArray = Array.from(Array(row), () => Array(col).fill(0));
		handleHolesState(newArray);
		navigate(AppPaths.play.path);
	}, [navigate, handleHolesState, row, col]);

	const handleChangeRow = React.useCallback(
		(value: number) => {
			handleRowState(value);
		},
		[handleRowState]
	);

	const handleChangeCol = React.useCallback(
		(value: number) => {
			handleColState(value);
		},
		[handleColState]
	);

	const handleChangeMole = React.useCallback(
		(value: number) => {
			handleMoleState(value);
		},
		[handleMoleState]
	);

	return (
		<section className="ready__content">
			<h1>Wake a mole!</h1>
			<table>
				<colgroup>
					<col />
					<col />
				</colgroup>
				<tbody>
					<tr>
						<td className="left-text">행</td>
						<td className="right-text">
							<NumberInput min={2} max={6} value={row} onChange={handleChangeRow} />
						</td>
					</tr>
					<tr>
						<td className="left-text">열</td>
						<td className="right-text">
							<NumberInput min={2} max={6} value={col} onChange={handleChangeCol} />
						</td>
					</tr>
					<tr>
						<td className="left-text">두더지</td>
						<td className="right-text">
							<NumberInput min={1} max={maxMole} value={mole} onChange={handleChangeMole} />
						</td>
					</tr>
				</tbody>
			</table>
			<Button className="ready__content__button" onClick={onClickStart}>
				시작
			</Button>
		</section>
	);
}

export default Ready;
