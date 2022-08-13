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

	const handleRowState = useCallback(
		(rowState: number) => {
			mutateRowState(rowState);
		},
		[mutateRowState]
	);
	const handleColState = useCallback(
		(colState: number) => {
			mutateColState(colState);
		},
		[mutateColState]
	);

	const handleMoleState = useCallback(
		(moleState: number) => {
			mutateMoleState(moleState);
		},
		[mutateMoleState]
	);

	const handleHolesState = useCallback(
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
		handleRowState,
		handleColState,
		handleMoleState,
		handleHolesState,
		clearReadyState
	};
};
