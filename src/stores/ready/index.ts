import React from 'react';
import { useStore } from 'stores';

export const UseReadyStore = () => {
	const { row, col, mole, mutateRowState, mutateColState, mutateMoleState, mutateClearState } = useStore(
		state => state
	);

	const handleRowState = React.useCallback(
		(row: number) => {
			mutateRowState(row);
		},
		[mutateRowState]
	);
	const handleColState = React.useCallback(
		(col: number) => {
			mutateColState(col);
		},
		[mutateColState]
	);

	const handleMoleState = React.useCallback(
		(mole: number) => {
			mutateMoleState(mole);
		},
		[mutateMoleState]
	);

	const clearReadyState = React.useCallback(() => {
		mutateClearState();
	}, [mutateClearState]);

	return {
		row,
		col,
		mole,
		handleRowState,
		handleColState,
		handleMoleState,
		clearReadyState
	};
};
