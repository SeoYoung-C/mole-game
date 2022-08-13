import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Loading, ScrollToTop } from 'components';

import { AppPaths } from 'constants/app-paths';

function Router() {
	return (
		<HashRouter>
			<ScrollToTop />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Navigate to="/ready" replace />} />
					<Route path={AppPaths.ready.path} key={AppPaths.ready.key} element={AppPaths.ready.element} />
					<Route path={AppPaths.play.path} key={AppPaths.play.key} element={AppPaths.play.element} />
					<Route path={AppPaths.result.path} key={AppPaths.result.key} element={AppPaths.result.element} />
				</Routes>
			</Suspense>
		</HashRouter>
	);
}

export default Router;
