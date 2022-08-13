import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UsePlayStore } from 'stores/play';

import { getCookie, setCookie } from 'utils/cookie';

import { AppPaths } from 'constants/app-paths';

import { Ranks } from 'pages/ranking/interface';

const useResult = () => {
	const navigate = useNavigate();
	const { score, clearPlayState } = UsePlayStore();

	const onClickPlayGames = useCallback(() => {
		clearPlayState();
		navigate(AppPaths.play.path);
	}, [clearPlayState, navigate]);

	const onClickRedirectReady = useCallback(() => {
		clearPlayState();
		navigate(AppPaths.ready.path);
	}, [clearPlayState, navigate]);

	const onClickRanking = useCallback(() => {
		clearPlayState();
		navigate(AppPaths.ranking.path);
	}, [clearPlayState, navigate]);

	useEffect(() => {
		if (score !== 0) {
			const ranking = getCookie('ranking');
			const rankList: Ranks[] = JSON.parse(ranking ?? '[]');
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

			const newArray = [...new Set(rankList)];

			if ([...newArray].length > 10) {
				rankList.slice(0, 11);
			}
			setCookie('ranking', JSON.stringify(rankList), 30);
		}
	}, [score]);

	return {
		score,
		onClickPlayGames,
		onClickRedirectReady,
		onClickRanking
	};
};

export default useResult;
