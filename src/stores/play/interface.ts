export interface PlayState {
	score: number;
}

export interface PlayStateSlice extends PlayState {
	mutateScoreStateIncrease: () => void;
	mutateScoreStateDecrease: () => void;
	mutateClearPlayState: () => void;
}
