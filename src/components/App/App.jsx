import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../hoc/AuthProvider';
import { AdminPath } from '../../hoc/AdminPath';
import { Layout } from './Layout';
import { LogInPage } from '../../pages/LogInPage/LogInPage';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { Main } from '../Main/Main';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

const App = () => (
	<AuthProvider>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					path="home/*"
					element={
						<AdminPath>
							<Main />
						</AdminPath>
					}
				/>
				<Route path="login" element={<LogInPage />} />
				<Route path="signup" element={<SignUpPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</AuthProvider>
);

export default App;
