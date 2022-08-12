import { StateCreator } from 'zustand';
import { ReadyState, ReadyStateStore } from './interface';

export const INITIAL_STATE: ReadyState = {
	row: 2,
	col: 2,
	mole: 1
};

export const ReadyStore: StateCreator<ReadyStateStore> = set => ({
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

	mutateClearState: () => {
		set({ ...INITIAL_STATE });
	}
});
