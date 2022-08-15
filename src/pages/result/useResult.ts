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

	// 페이지 진입시 score의 값이 0 이상일때 순위를 Cookie에 저장
	useEffect(() => {
		if (score > 0) {
			const ranking = getCookie('ranking');
			const parseRanking: Ranks[] = JSON.parse(ranking ?? '[]');
			const newRecords = { score, date: new Date().toISOString() };

			const equalDateTime = parseRanking.findIndex(prev => {
				const prevRankDate = formatDate(prev.date, 'YYYYMMDDHHmm');
				const newRecordDate = formatDate(newRecords.date, 'YYYYMMDDHHmm');
				const prevRankScore = prev.score;
				const newRecordScore = newRecords.score;
				return prevRankDate === newRecordDate && prevRankScore === newRecordScore;
			});

			if (equalDateTime === -1) parseRanking.push(newRecords);

			parseRanking
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

			setCookie('ranking', JSON.stringify(parseRanking), 30);
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
