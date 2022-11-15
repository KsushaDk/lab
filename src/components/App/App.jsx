import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

const SignUpPage = React.lazy(() => import('Pages/SignUpPage/SignUpPage'));
const LogInPage = React.lazy(() => import('Pages/LogInPage/LogInPage'));
const ErrorPage = React.lazy(() => import('Pages/ErrorPage/ErrorPage'));
const InfoPage = React.lazy(() => import('Pages/InfoPage/InfoPage'));
const InterviewPage = React.lazy(() =>
	import('Pages/InterviewPage/InterviewPage')
);
const Loader = React.lazy(() => import('../Loader/Loader'));
const Main = React.lazy(() => import('../Main/Main'));

const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<LogInPage />} />
				<Route path="home/*" element={<Main />} />
				<Route path="signup" element={<SignUpPage />} />
				<Route path="interview/:interviewId" element={<InterviewPage />} />
				<Route path="info" element={<InfoPage />} />
				<Route
					path="*"
					element={<ErrorPage link="/" message="This page doesn't exist." />}
				/>
			</Route>
		</Routes>
	</Suspense>
);

export default App;
