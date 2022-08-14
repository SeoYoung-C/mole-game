import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useLessThenHalf from 'hooks/useLessThenHalf';

import { UseReadyStore } from 'stores/ready';
import { AppPaths } from 'constants/app-paths';

const useReady = () => {
	const navigate = useNavigate();

	const { row, col, mole, changeRowState, changeColState, changeMoleState, changeHolesState } = UseReadyStore();
	const maxMole = useLessThenHalf({ row, col });

	const onClickStart = useCallback(() => {
		const newArray = Array.from(Array(row), () => Array(col).fill(0));
		changeHolesState(newArray);
		navigate(AppPaths.play.path);
	}, [navigate, changeHolesState, row, col]);

	const onClickRanking = useCallback(() => {
		navigate(AppPaths.ranking.path);
	}, [navigate]);

	const onChangeRow = useCallback(
		(value: number) => {
			changeRowState(value);
		},
		[changeRowState]
	);

	const onChangeCol = useCallback(
		(value: number) => {
			changeColState(value);
		},
		[changeColState]
	);

	const onChangeMole = useCallback(
		(value: number) => {
			changeMoleState(value);
		},
		[changeMoleState]
	);

	useEffect(() => {
		if (maxMole < mole) {
			changeMoleState(maxMole);
		}
	}, [changeMoleState, maxMole, mole]);

	return {
		row,
		col,
		mole,
		maxMole,
		onChangeRow,
		onChangeCol,
		onChangeMole,
		onClickStart,
		onClickRanking
	};
};

export default useReady;
