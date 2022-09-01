import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from '../Sidebar/Sidebar';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { CreateInterviewPage } from '../../pages/CreateInterviewPage/CreateInterviewPage';
import { UserInterviewsPage } from '../../pages/UserInterviewsPage/UserInterviewsPage';
import { InterviewTemplatesPage } from '../../pages/InterviewTemplatesPage/InterviewTemplatesPage';
import { UserListPage } from '../../pages/UserListPage/UserListPage';
import './Main.scss';

export const Main = () => (
	<main className="main">
		<Sidebar />
		<Routes>
			<Route path="/" element={<AboutPage />} />
			<Route path="create" element={<CreateInterviewPage />} />
			<Route path="interviews" element={<UserInterviewsPage />} />
			<Route path="templates" element={<InterviewTemplatesPage />} />
			<Route path="users" element={<UserListPage />} />
		</Routes>
	</main>
);
