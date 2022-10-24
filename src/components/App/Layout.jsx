import React, { Suspense, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../Header/Header';
import { Loader } from '../Loader/Loader';
import './App.scss';

export const Layout = () => {
	const handleClick = useCallback((e) => {
		const d = document.createElement('div');
		d.className = 'clickEffect';
		d.style.top = `${e.clientY}px`;
		d.style.left = `${e.clientX}px`;
		document.body.appendChild(d);
		d.addEventListener('animationend', () => {
			d.parentElement.removeChild(d);
		});
	});

	return (
		<div className="app" onClick={handleClick}>
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
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
		</div>
	);
};
