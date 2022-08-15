import { StateCreator } from 'zustand';
import { PlayState, PlayStateSlice } from './interface';

export const INITIAL_STATE: PlayState = {
	holes: [
		[0, 0],
		[0, 0]
	],
	score: 0
};

export const PlaySlice: StateCreator<PlayStateSlice> = set => ({
	...INITIAL_STATE,

	mutateHolesState: (holes: number[][]) => {
		set(() => ({ holes }));
	},

	mutateScoreStateIncrease: () => {
		set(state => ({ score: state.score + 1 }));
	},

	mutateScoreStateDecrease: () => {
		set(state => ({ score: state.score - 1 }));
	},

	mutateClearScoreState: () => {
		set({ score: INITIAL_STATE.score });
	}
});
