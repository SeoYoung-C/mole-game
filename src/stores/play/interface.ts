export interface PlayState {
	score: number;
}

export interface PlayStateSlice extends PlayState {
	mutateScoreIncreaseState: () => void;
	mustateScoreDecreaseState: () => void;
	mutateClearState: () => void;
}
