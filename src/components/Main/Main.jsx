import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPath } from 'Hoc/PublicPath';
import { AdminPath } from 'Hoc/AdminPath';
import './Main.scss';

const Sidebar = React.lazy(() => import('../Sidebar/Sidebar'));
const AboutPage = React.lazy(() => import('Pages/AboutPage/AboutPage'));
const UserListPage = React.lazy(() =>
	import('Pages/UserListPage/UserListPage')
);
const InterviewListPage = React.lazy(() =>
	import('Pages/InterviewListPage/InterviewListPage')
);
const CreateInterviewPage = React.lazy(() =>
	import('Pages/CreateInterviewPage/CreateInterviewPage')
);
const InterviewTemplatesPage = React.lazy(() =>
	import('Pages/InterviewTemplatesPage/InterviewTemplatesPage')
);
const InterviewResultsPage = React.lazy(() =>
	import('Pages/InterviewResultsPage/InterviewResultsPage')
);
const UserResultsPage = React.lazy(() =>
	import('Pages/UserResultsPage/UserResultsPage')
);

const Main = () => (
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
				<Route
					path="results/:interviewId"
					element={
						<AdminPath>
							<InterviewResultsPage />
						</AdminPath>
					}
				/>
				<Route
					path="results/:interviewId/:userId"
					element={
						<AdminPath>
							<UserResultsPage />
						</AdminPath>
					}
				/>
			</Routes>
		</main>
	</PublicPath>
);

export default Main;
