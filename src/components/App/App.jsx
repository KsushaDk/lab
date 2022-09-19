import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { Layout } from './Layout';
import { Main } from '../Main/Main';

const App = () => (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route index element={<LogInPage />} />
			<Route path="home/*" element={<Main />} />
			<Route path="signup" element={<SignUpPage />} />
			<Route
				path="*"
				element={
					<ErrorPage link="/" message="This page doesn't exist. Go&nbsp;" />
				}
			/>
		</Route>
	</Routes>
);

export default App;
