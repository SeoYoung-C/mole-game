import React from 'react';

import { Button } from 'components';
import { formatDate } from 'utils/format-date';

import useRanking from './hook';

function Ranking() {
	const { ranking, onClickResetRanking, onClickGameStart } = useRanking();

	return (
		<main>
			<h1>게임 순위</h1>
			<div>순위는 마지막 접속일로부터 최대 30일까지만 저장 됩니다.</div>

			{ranking.length > 0 ? (
				<section>
					{ranking.map((item, index) => (
						<section key={item.date + index.toString()}>
							<div>{index + 1}</div>
							<div>{item.score}</div>
							<div>{formatDate(item.date, 'YYYY-MM-DD AA hh:mm:ss', { isLocale: true })}</div>
						</section>
					))}
					<Button onClick={onClickResetRanking}>게임 순위 초기화</Button>
				</section>
			) : (
				<div>저장된 순위가 없어요. 지금 다시 게임을 시작하세요!</div>
			)}

			<Button onClick={onClickGameStart}>게임 시작</Button>
		</main>
	);
}

export default Ranking;
