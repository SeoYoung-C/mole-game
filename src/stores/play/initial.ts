import { StateCreator } from 'zustand';
import { PlayState, PlayStateStore } from './interface';

export const INITIAL_STATE: PlayState = {
	score: 0
};

export const PlayStore: StateCreator<PlayStateStore> = set => ({
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
