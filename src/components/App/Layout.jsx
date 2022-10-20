import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../Header/Header';
import './App.scss';

export const Layout = () => (
	<div className="app">
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
		<Header />
		<Outlet />
	</div>
);
