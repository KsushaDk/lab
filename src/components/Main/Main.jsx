import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPath } from 'Hoc/PublicPath';
import { AdminPath } from 'Hoc/AdminPath';
import { InterviewTemplatesPage } from 'Pages/InterviewTemplatesPage/InterviewTemplatesPage';
import { CreateInterviewPage } from 'Pages/CreateInterviewPage/CreateInterviewPage';
import { InterviewListPage } from 'Pages/InterviewListPage/InterviewListPage';
import { UserListPage } from 'Pages/UserListPage/UserListPage';
import { AboutPage } from 'Pages/AboutPage/AboutPage';
import { Sidebar } from '../Sidebar/Sidebar';
import './Main.scss';

export const Main = () => (
	<PublicPath>
		<main className="main">
			<Sidebar />
			<div className="vertical_gray-line" />
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
	</PublicPath>
);
