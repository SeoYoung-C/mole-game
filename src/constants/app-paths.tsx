import React, { lazy } from 'react';

import Ready from 'pages/ready';

const Play = lazy(() => import('../pages/play'));
const Result = lazy(() => import('../pages/result'));
const Ranking = lazy(() => import('../pages/ranking'));

export interface Path {
	path: string;
	key: string;
	label: string;
	element: JSX.Element;
}

export type AppPathKey = 'ready' | 'play' | 'result' | 'ranking';

export type AppPath = {
	[key in AppPathKey]: Path;
};

const ready = Object.freeze<Path>({
	path: '/ready',
	key: 'ready',
	label: '게임 준비',
	element: <Ready />
});

const play = Object.freeze<Path>({
	path: '/play',
	key: 'paly',
	label: '게임 시작',
	element: <Play />
});

const result = Object.freeze<Path>({
	path: '/result',
	key: 'result',
	label: '게임 종료',
	element: <Result />
});

const ranking = Object.freeze<Path>({
	path: '/ranking',
	key: 'ranking',
	label: '게임 순위',
	element: <Ranking />
});

export const AppPaths: AppPath = {
	ready,
	play,
	result,
	ranking
};
