import { StateCreator } from 'zustand';
import { PlayState, PlayStateSlice } from './interface';

export const INITIAL_STATE: PlayState = {
	score: 0
};

export const PlaySlice: StateCreator<PlayStateSlice> = set => ({
	...INITIAL_STATE,

	mutateScoreStateIncrease: () => {
		set(state => ({ score: state.score + 1 }));
	},

	mutateScoreStateDecrease: () => {
		set(state => ({ score: state.score - 1 }));
	},

	mutateClearPlayState: () => {
		set({ ...INITIAL_STATE });
	}
});
