import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteCookie, getCookie } from 'utils/cookie';

import { AppPaths } from 'constants/app-paths';
import { Ranks } from './interface';

const useRanking = () => {
	const navigate = useNavigate();
	const [ranking, setRanking] = useState<Ranks[]>([]);

	const onClickResetRanking = useCallback(() => {
		setRanking([]);
		deleteCookie('ranking');
	}, []);

	const onClickGameStart = useCallback(() => {
		navigate(AppPaths.ready.path);
	}, [navigate]);

	// 페이지 진입시 쿠키에 저장된 Ranking 정보를 가져와 화면에 표출
	useEffect(() => {
		const getRanking = getCookie('ranking');
		if (getRanking) {
			const rankList: Ranks[] = JSON.parse(getRanking);
			if (rankList.length === 10) {
				setRanking(rankList);
			} else {
				const renderRank = [...rankList];
				for (let index = rankList.length + 1; index < 11; index += 1) {
					renderRank.push({ score: 0, date: '-' });
				}
				setRanking(renderRank);
			}
		}
	}, []);

	return {
		ranking,
		onClickResetRanking,
		onClickGameStart
	};
};

export default useRanking;
