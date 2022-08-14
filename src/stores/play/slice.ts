import { StateCreator } from 'zustand';
import { PlayState, PlayStateSlice } from './interface';

export const INITIAL_STATE: PlayState = {
	score: 0
};

export const PlaySlice: StateCreator<PlayStateSlice> = set => ({
	...INITIAL_STATE,

	mutateScoreIncreaseState: () => {
		set(state => ({ score: state.score + 1 }));
	},

	mustateScoreDecreaseState: () => {
		set(state => ({ score: state.score - 1 }));
	},

	mutateClearState: () => {
		set({ ...INITIAL_STATE });
	}
});
