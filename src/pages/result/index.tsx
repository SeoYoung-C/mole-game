import React from 'react';
import { Button } from 'components';
import useResult from './hook';

function Result() {
	const { score, onClickPlayGames, onClickRedirectReady, onClickRanking } = useResult();

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
