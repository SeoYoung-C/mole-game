import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import UseStore from 'stores';

import useLessThenHalf, { calculatorLessThenHalf } from 'hooks/useLessThenHalf';

import { AppPaths } from 'constants/app-paths';

const useReady = () => {
	const navigate = useNavigate();

	const { row, col, mole, mutateRowState, mutateColState, mutateMoleState, mutateHolesState } = UseStore(
		state => state
	);
	const maxMole = useLessThenHalf({ row, col });

	const onClickStart = useCallback(() => {
		const newArray = Array.from(Array(row), () => Array(col).fill(0));
		mutateHolesState(newArray);
		navigate(AppPaths.play.path);
	}, [navigate, mutateHolesState, row, col]);

	const onClickRanking = useCallback(() => {
		navigate(AppPaths.ranking.path);
	}, [navigate]);

	const onChangeRow = useCallback(
		(value: number) => {
			mutateRowState(value);

			const tempMole = calculatorLessThenHalf(value, col);
			if (tempMole < mole) {
				mutateMoleState(tempMole);
			}
		},
		[mutateRowState, mutateMoleState, mole, col]
	);

	const onChangeCol = useCallback(
		(value: number) => {
			mutateColState(value);

			const tempMole = calculatorLessThenHalf(row, value);
			if (tempMole < mole) {
				mutateMoleState(tempMole);
			}
		},
		[mutateColState, mutateMoleState, mole, row]
	);

	const onChangeMole = useCallback(
		(value: number) => {
			mutateMoleState(value);
		},
		[mutateMoleState]
	);

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
