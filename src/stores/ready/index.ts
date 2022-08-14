import { useCallback } from 'react';
import useStore from 'stores';

export const UseReadyStore = () => {
	const {
		row,
		col,
		mole,
		holes,
		mutateRowState,
		mutateColState,
		mutateMoleState,
		mutateHolesState,
		mutateClearState
	} = useStore(state => state);

	const changeRowState = useCallback(
		(rowState: number) => {
			mutateRowState(rowState);
		},
		[mutateRowState]
	);
	const changeColState = useCallback(
		(colState: number) => {
			mutateColState(colState);
		},
		[mutateColState]
	);

	const changeMoleState = useCallback(
		(moleState: number) => {
			mutateMoleState(moleState);
		},
		[mutateMoleState]
	);

	const changeHolesState = useCallback(
		(holesState: number[][]) => {
			mutateHolesState(holesState);
		},
		[mutateHolesState]
	);

	const clearReadyState = useCallback(() => {
		mutateClearState();
	}, [mutateClearState]);

	return {
		row,
		col,
		mole,
		holes,
		changeRowState,
		changeColState,
		changeMoleState,
		changeHolesState,
		clearReadyState
	};
};
