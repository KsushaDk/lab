import React, { Suspense, useCallback, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from 'Hoc/ThemeProvider';
import './App.scss';

const Header = React.lazy(() => import('../Header/Header'));
const Loader = React.lazy(() => import('../Loader/Loader'));
const ClickEffect = React.lazy(() => import('../ui/click/ClickEffect'));

export const Layout = () => {
	const [isClicked, setClicked] = useState(false);
	const [clickLocation, setClickLocation] = useState({
		top: '0px',
		left: '0px',
	});

	const { theme } = useContext(ThemeContext);

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
		<div className={`theme_${theme} app`} onClick={handleClick}>
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
				theme={theme}
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
