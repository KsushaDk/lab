import React, { Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { InterviewPage } from 'Pages/InterviewPage/InterviewPage';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { InfoPage } from 'Pages/InfoPage/InfoPage';
import { Loader } from '../Loader/Loader';
import { Main } from '../Main/Main';
import { Layout } from './Layout';

const App = () => {
	const clickEffect = useCallback((e) => {
		const d = document.createElement('div');
		d.className = 'clickEffect';
		d.style.top = `${e.clientY}px`;
		d.style.left = `${e.clientX}px`;
		document.body.appendChild(d);
		d.addEventListener('animationend', () => {
			d.parentElement.removeChild(d);
		});
	});

	document.addEventListener('click', clickEffect);

	return (
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
};

export default App;
