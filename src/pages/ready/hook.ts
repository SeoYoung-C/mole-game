import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useLessThenHalf from 'hooks/useLessThenHalf';

import { UseReadyStore } from 'stores/ready';
import { AppPaths } from 'constants/app-paths';

const useReady = () => {
	const navigate = useNavigate();

	const { row, col, mole, handleRowState, handleColState, handleMoleState, handleHolesState } = UseReadyStore();
	const maxMole = useLessThenHalf({ row, col });

	const onClickStart = useCallback(() => {
		const newArray = Array.from(Array(row), () => Array(col).fill(0));
		handleHolesState(newArray);
		navigate(AppPaths.play.path);
	}, [navigate, handleHolesState, row, col]);

	const onClickRanking = useCallback(() => {
		navigate(AppPaths.ranking.path);
	}, [navigate]);

	const onChangeRow = useCallback(
		(value: number) => {
			handleRowState(value);
		},
		[handleRowState]
	);

	const onChangeCol = useCallback(
		(value: number) => {
			handleColState(value);
		},
		[handleColState]
	);

	const onChangeMole = useCallback(
		(value: number) => {
			handleMoleState(value);
		},
		[handleMoleState]
	);

	useEffect(() => {
		if (maxMole < mole) {
			handleMoleState(maxMole);
		}
	}, [handleMoleState, maxMole, mole]);

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
