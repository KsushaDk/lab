import React, { Suspense, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClickEffect } from '../ui/click/ClickEffect';
import { Header } from '../Header/Header';
import { Loader } from '../Loader/Loader';
import './App.scss';

export const Layout = () => {
	const [isClicked, setClicked] = useState(false);
	const [clickLocation, setClickLocation] = useState({
		top: '0px',
		left: '0px',
	});

	const handleClick = useCallback((e) => {
		setClicked(true);
		setClickLocation({
			top: `${e.clientY}px`,
			left: `${e.clientX}px`,
		});
	});

	const handleAnimationEnd = useCallback(() => {
		setClicked(false);
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
			{isClicked && (
				<ClickEffect
					location={clickLocation}
					handleAnimationEnd={handleAnimationEnd}
				/>
			)}
			<Header />
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
		</div>
	);
};
