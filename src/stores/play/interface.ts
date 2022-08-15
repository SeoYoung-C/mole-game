export interface PlayState {
	holes: number[][];
	score: number;
}

export interface PlayStateSlice extends PlayState {
	mutateHolesState: (holes: number[][]) => void;
	mutateScoreStateIncrease: () => void;
	mutateScoreStateDecrease: () => void;
	mutateClearScoreState: () => void;
}
