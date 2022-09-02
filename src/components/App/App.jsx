import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { NotFoundPage } from 'Pages/NotFoundPage/NotFoundPage';
import { Layout } from './Layout';
import { Main } from '../Main/Main';
import { AuthProvider } from '../../hoc/AuthProvider';

const App = () => (
	<AuthProvider>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<LogInPage />} />
				<Route path="home/*" element={<Main />} />
				<Route path="signup" element={<SignUpPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</AuthProvider>
);

export default App;
