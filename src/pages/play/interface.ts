interface TimeoutRefObject {
	[key: string]: NodeJS.Timeout | number;
}

export type SetTimeoutRefType = TimeoutRefObject[];
export type ClearType = 'button' | 'all';
