import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UseStore from 'stores';

import { getCookie, setCookie } from 'utils/cookie';

import { AppPaths } from 'constants/app-paths';

import { Ranks } from 'pages/ranking/interface';
import { formatDate } from '../../utils/format-date';

const useResult = () => {
	const navigate = useNavigate();
	const { score, mutateClearScoreState } = UseStore(state => state);

	const onClickPlayGames = useCallback(() => {
		mutateClearScoreState();
		navigate(AppPaths.play.path);
	}, [mutateClearScoreState, navigate]);

	const onClickRedirectReady = useCallback(() => {
		mutateClearScoreState();
		navigate(AppPaths.ready.path);
	}, [mutateClearScoreState, navigate]);

	const onClickRanking = useCallback(() => {
		mutateClearScoreState();
		navigate(AppPaths.ranking.path);
	}, [mutateClearScoreState, navigate]);

	useEffect(() => {
		if (score > 0) {
			const ranking = getCookie('ranking');
			const parseRanking: Ranks[] = JSON.parse(ranking ?? '[]');
			parseRanking.push({ score, date: new Date().toISOString() });

			const rankList = parseRanking
				.reduce((acc: Ranks[], cur) => {
					const equalDateTime = acc.findIndex(
						({ date }) => formatDate(date, 'YYYYMMDDHHmmss') === formatDate(cur.date, 'YYYYMMDDHHmmss')
					);
					if (equalDateTime === -1) acc.push(cur);
					return acc;
				}, [])
				.sort((a, b) => {
					const rules = b.score - a.score;
					if (rules > 0) {
						return 1;
					}
					if (rules === 0) {
						return new Date(b.date).getTime() - new Date(a.date).getTime();
					}
					return -1;
				})
				.slice(0, 10);

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
