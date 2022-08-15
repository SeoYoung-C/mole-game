import { StateCreator } from 'zustand';
import { ReadyState, ReadyStateSlice } from './interface';

export const INITIAL_STATE: ReadyState = {
	row: 2,
	col: 2,
	mole: 1
};

export const ReadySlice: StateCreator<ReadyStateSlice> = set => ({
	...INITIAL_STATE,

	mutateRowState: (row: number) => {
		set(() => ({ row }));
	},

	mutateColState: (col: number) => {
		set(() => ({ col }));
	},

	mutateMoleState: (mole: number) => {
		set(() => ({ mole }));
	},

	mutateClearReadyState: () => {
		set({ ...INITIAL_STATE });
	}
});
