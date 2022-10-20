import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { InterviewPage } from 'Pages/InterviewPage/InterviewPage';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { InfoPage } from 'Pages/InfoPage/InfoPage';
import { Layout } from './Layout';
import { Main } from '../Main/Main';

const App = () => (
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
);

export default App;
