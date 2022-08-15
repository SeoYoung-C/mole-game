import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UseStore from 'stores';

import { getCookie, setCookie } from 'utils/cookie';

import { AppPaths } from 'constants/app-paths';

import { Ranks } from 'pages/ranking/interface';
import { formatDate } from '../../utils/format-date';

const useResult = () => {
	const navigate = useNavigate();
	const { score, mutateClearPlayState } = UseStore(state => state);

	const onClickPlayGames = useCallback(() => {
		mutateClearPlayState();
		navigate(AppPaths.play.path);
	}, [mutateClearPlayState, navigate]);

	const onClickRedirectReady = useCallback(() => {
		mutateClearPlayState();
		navigate(AppPaths.ready.path);
	}, [mutateClearPlayState, navigate]);

	const onClickRanking = useCallback(() => {
		mutateClearPlayState();
		navigate(AppPaths.ranking.path);
	}, [mutateClearPlayState, navigate]);

	useEffect(() => {
		if (score > 0) {
			const ranking = getCookie('ranking');
			const parseRanking: Ranks[] = JSON.parse(ranking ?? '[]');
			parseRanking.push({ score, date: new Date().toISOString() });

			const rankList = parseRanking
				.reduce((acc: Ranks[], cur) => {
					if (
						acc.findIndex(
							({ date }) => formatDate(date, 'YYYYMMDDHHmmss') === formatDate(cur.date, 'YYYYMMDDHHmmss')
						) === -1
					) {
						acc.push(cur);
					}
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
