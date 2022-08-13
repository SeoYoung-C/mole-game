import { useCallback } from 'react';
import useStore from 'stores';

export const UsePlayStore = () => {
	const { score, mutateScoreIncreaseState, mustateScoreDecreaseState, mutateClearState } = useStore(state => state);

	const handleIncreaseScore = useCallback(() => {
		mutateScoreIncreaseState();
	}, [mutateScoreIncreaseState]);

	const handleDecreaseScore = useCallback(() => {
		mustateScoreDecreaseState();
	}, [mustateScoreDecreaseState]);

	const clearPlayState = useCallback(() => {
		mutateClearState();
	}, [mutateClearState]);

	return {
		score,
		handleIncreaseScore,
		handleDecreaseScore,
		clearPlayState
	};
};
