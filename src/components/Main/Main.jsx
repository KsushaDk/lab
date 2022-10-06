import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicPath } from 'Hoc/PublicPath';
import { AdminPath } from 'Hoc/AdminPath';
import { AboutPage } from 'Pages/AboutPage/AboutPage';
import { CreateInterviewPage } from 'Pages/CreateInterviewPage/CreateInterviewPage';
import { InterviewListPage } from 'Pages/InterviewListPage/InterviewListPage';
import { InterviewTemplatesPage } from 'Pages/InterviewTemplatesPage/InterviewTemplatesPage';
import { UserListPage } from 'Pages/UserListPage/UserListPage';
import { Sidebar } from '../Sidebar/Sidebar';

import './Main.scss';

export const Main = () => (
	<PublicPath>
		<main className="main">
			<ToastContainer
				position="bottom-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
