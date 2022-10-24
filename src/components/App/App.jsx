import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { InfoPage } from 'Pages/InfoPage/InfoPage';
import { Loader } from '../Loader/Loader';
import { Main } from '../Main/Main';
import { Layout } from './Layout';

const InterviewPage = React.lazy(() =>
	import('Pages/InterviewPage/InterviewPage')
);

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
