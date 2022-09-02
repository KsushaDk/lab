import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AboutPage } from 'Pages/AboutPage/AboutPage';
import { LogInPage } from 'Pages/LogInPage/LogInPage';
import { SignUpPage } from 'Pages/SignUpPage/SignUpPage';
import { NotFoundPage } from 'Pages/NotFoundPage/NotFoundPage';
import { AuthProvider } from '../../hoc/AuthProvider';
import { Layout } from './Layout';
import { Main } from '../Main/Main';

const App = () => (
	<AuthProvider>
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* <Route path="/" element={<AboutPage />} /> */}
				<Route index element={<LogInPage />} />
				<Route path="home/*" element={<Main />} />
				<Route path="signup" element={<SignUpPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</AuthProvider>
);

export default App;
