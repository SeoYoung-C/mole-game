import React from 'react';

function Loading() {
	return (
		<section className="loading-wrap">
			<div className="loading-container">
				<div className="loading" />
				<div className="loading-text">loading</div>
			</div>
		</section>
	);
}

Loading.displayName = 'Laoding';

export default Loading;
