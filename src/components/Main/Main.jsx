import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AboutPage } from 'Pages/AboutPage/AboutPage';
import { CreateInterviewPage } from 'Pages/CreateInterviewPage/CreateInterviewPage';
import { InterviewListPage } from 'Pages/InterviewListPage/InterviewListPage';
import { InterviewTemplatesPage } from 'Pages/InterviewTemplatesPage/InterviewTemplatesPage';
import { UserListPage } from 'Pages/UserListPage/UserListPage';
import { Sidebar } from '../Sidebar/Sidebar';
import { AdminPath } from '../../hoc/AdminPath';
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
