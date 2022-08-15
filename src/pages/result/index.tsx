import React from 'react';
import { Button } from 'components';
import useResult from './useResult';

function Result() {
	const { score, onClickPlayGames, onClickRedirectReady, onClickRanking } = useResult();

	return (
		<main className="result">
			<h1>Game Over !</h1>

			<h2>
				최종 점수 <span>{score}</span>
			</h2>
			<section className="result__button-wrap">
				<div>
					<Button onClick={onClickPlayGames}>다시하기 </Button>
					<Button onClick={onClickRedirectReady}>처음으로</Button>
				</div>

				<div>
					<Button onClick={onClickRanking} className="ranking-button">
						랭킹
					</Button>
				</div>
			</section>
		</main>
	);
}

export default Result;
