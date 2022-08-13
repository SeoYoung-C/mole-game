export interface PlayState {
	score: number;
}

export interface PlayStateStore extends PlayState {
	mutateScoreIncreaseState: () => void;
	mustateScoreDecreaseState: () => void;
	mutateClearState: () => void;
}
