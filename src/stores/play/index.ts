import { useCallback } from 'react';
import useStore from 'stores';

export const UsePlayStore = () => {
	const { score, mutateScoreIncreaseState, mustateScoreDecreaseState, mutateClearState } = useStore(state => state);

	const increaseScore = useCallback(() => {
		mutateScoreIncreaseState();
	}, [mutateScoreIncreaseState]);

	const decreaseScore = useCallback(() => {
		mustateScoreDecreaseState();
	}, [mustateScoreDecreaseState]);

	const clearPlayState = useCallback(() => {
		mutateClearState();
	}, [mutateClearState]);

	return {
		score,
		increaseScore,
		decreaseScore,
		clearPlayState
	};
};
