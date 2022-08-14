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

	useEffect(() => {
		const getRanking = getCookie('ranking');
		if (getRanking) {
			const rankList: Ranks[] = JSON.parse(getRanking);
			setRanking(rankList);
		}
	}, []);

	return {
		ranking,
		onClickResetRanking,
		onClickGameStart
	};
};

export default useRanking;
