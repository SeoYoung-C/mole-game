export interface ReadyState {
	row: number;
	col: number;
	mole: number;
	holes: number[][];
}

export interface ReadyStateStore extends ReadyState {
	mutateRowState: (row: number) => void;
	mutateColState: (col: number) => void;
	mutateMoleState: (mole: number) => void;
	mutateHolesState: (holes: number[][]) => void;
	mutateClearState: () => void;
}
