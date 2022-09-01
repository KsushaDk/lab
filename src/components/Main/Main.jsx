import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminPath } from '../../hoc/AdminPath';
import { Sidebar } from '../Sidebar/Sidebar';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { CreateInterviewPage } from '../../pages/CreateInterviewPage/CreateInterviewPage';
import { InterviewListPage } from '../../pages/InterviewListPage/InterviewListPage';
import { InterviewTemplatesPage } from '../../pages/InterviewTemplatesPage/InterviewTemplatesPage';
import { UserListPage } from '../../pages/UserListPage/UserListPage';
import './Main.scss';

export const Main = () => (
	<main className="main">
		<Sidebar />
		<Routes>
			<Route path="/" element={<AboutPage />} />
			<Route
				path="create"
				element={
					<AdminPath>
						<CreateInterviewPage />
					</AdminPath>
				}
			/>
			<Route
				path="interviews"
				element={
					<AdminPath>
						<InterviewListPage />
					</AdminPath>
				}
			/>
			<Route
				path="templates"
				element={
					<AdminPath>
						<InterviewTemplatesPage />
					</AdminPath>
				}
			/>
			<Route
				path="users"
				element={
					<AdminPath>
						<UserListPage />
					</AdminPath>
				}
			/>
		</Routes>
	</main>
);
