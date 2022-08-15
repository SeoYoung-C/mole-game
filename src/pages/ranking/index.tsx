import React from 'react';

import { Button } from 'components';
import { formatDate } from 'utils/format-date';

import useRanking from './useRanking';

function Ranking() {
	const { ranking, onClickResetRanking, onClickGameStart } = useRanking();

	return (
		<main className="ranking">
			<h1>Ranking !</h1>
			<p>순위는 상위 10위까지, 마지막 게임 완료 날짜로부터 최대 30일까지만 저장 됩니다.</p>

			{ranking.length > 0 ? (
				<section className="ranking__content">
					<Button onClick={onClickResetRanking} className="reset-rank-button">
						게임 순위 초기화
					</Button>
					<table>
						<colgroup>
							<col width="20%" />
							<col width="20%" />
							<col width="60%" />
						</colgroup>
						<thead>
							<tr>
								<th>순위</th>
								<th>점수</th>
								<th>일시</th>
							</tr>
						</thead>
						<tbody>
							{ranking.map((item, index) => (
								<tr key={item.date + index.toString()}>
									<td>{index + 1}</td>
									<td>{item.score === 0 ? '-' : item.score}</td>
									<td>
										{item.date === '-'
											? item.date
											: formatDate(item.date, 'YYYY-MM-DD AA hh:mm:ss', { isLocale: true })}
									</td>
								</tr>
							))}
						</tbody>
						<caption>게임 순위는 게임 점수가 1점 이상일 때만 기록 됩니다.</caption>
					</table>
				</section>
			) : (
				<div>저장된 순위가 없어요. 지금 다시 게임을 시작하세요!</div>
			)}

			<Button onClick={onClickGameStart}>게임 시작</Button>
		</main>
	);
}

export default Ranking;
