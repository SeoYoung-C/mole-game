import React from 'react';
import { Button } from 'components';

import { UsePlayStore } from 'stores/play';

import { getCookie, setCookie } from 'utils/cookie';

import { AppPaths } from 'constants/app-paths';

import { Ranks } from 'pages/ranking/interface';
import { useNavigate } from 'react-router-dom';

function Result() {
	const navigate = useNavigate();
	const { score, clearPlayState } = UsePlayStore();

	const onClickPlayGames = React.useCallback(() => {
		clearPlayState();
		navigate(AppPaths.play.path);
	}, [clearPlayState, navigate]);

	const onClickRedirectReady = React.useCallback(() => {
		clearPlayState();
		navigate(AppPaths.ready.path);
	}, [clearPlayState, navigate]);

	const onClickRanking = React.useCallback(() => {
		clearPlayState();
		navigate(AppPaths.ranking.path);
	}, [clearPlayState, navigate]);

	React.useEffect(() => {
		const ranking = getCookie('ranking');
		if (ranking && score !== 0) {
			const rankList: Ranks[] = JSON.parse(ranking);
			rankList.push({ score, date: new Date().toISOString() });
			rankList.sort((a, b) => {
				const rules = b.score - b.score;
				if (rules > 0) {
					return 1;
				}
				if (rules === 0) {
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				}
				return -1;
			});
			if (rankList.length > 10) {
				rankList.slice(0, 11);
			}
			setCookie('ranking', JSON.stringify(rankList), 30);
		}
	}, [score]);

	return (
		<>
			<h1>최종 점수</h1>
			<div>{score}</div>
			<Button onClick={onClickPlayGames}>다시하기 </Button>
			<Button onClick={onClickRedirectReady}>처음으로</Button>
			<Button onClick={onClickRanking}>랭킹</Button>
		</>
	);
}

export default Result;
