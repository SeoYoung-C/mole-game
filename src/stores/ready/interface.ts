export interface ReadyState {
	row: number;
	col: number;
	mole: number;
}

export interface ReadyStateSlice extends ReadyState {
	mutateRowState: (row: number) => void;
	mutateColState: (col: number) => void;
	mutateMoleState: (mole: number) => void;
	mutateClearReadyState: () => void;
}
