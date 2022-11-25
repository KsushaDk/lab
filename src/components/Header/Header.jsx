import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ImUser } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import {
	BsBoxArrowRight,
	BsFillBrightnessLowFill,
	BsFillMoonStarsFill,
} from 'react-icons/bs';
import { updateDataInLS } from 'Utils/funcForLSByKey';
import { getUserData } from 'Utils/getUserData';
import { ThemeContext } from 'Hoc/ThemeProvider';
import logo from './logo.svg';
import './Header.scss';

const LngSwitcher = React.lazy(() => import('../LngSwitcher/LngSwitcher'));

const Header = () => {
	const navigate = useNavigate();

	const { theme, toggleTheme } = useContext(ThemeContext);

	const { t } = useTranslation();

	const { currentUser } = getUserData();

	const logout = () => {
		const updatedUser = { ...currentUser, isAuth: false };
		updateDataInLS('users', updatedUser);
		navigate('/', { replace: true });
	};

	return (
		<header className="header">
			<Link className="primary_logo" to="/home">
				<img src={logo} alt="ITechArt Logo" />
			</Link>
			<nav className="nav__links">
				<NavLink
					to="/home"
					className={({ isActive }) =>
						isActive ? 'active link_white' : 'link_white'
					}
				>
					{t('header.about')}
				</NavLink>

				{!currentUser ? (
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? 'active link_white' : 'link_white'
						}
					>
						{t('header.logIn')}
					</NavLink>
				) : (
					<div className="nav__user">
						<ImUser className="icon_white icon_m disabled_item" />
						<span className="nav__user_name">
							{t('header.greeting')},&nbsp;{currentUser.username}!
						</span>
						<BsBoxArrowRight className="icon_white icon_l" onClick={logout} />
					</div>
				)}
				{theme === 'dark' ? (
					<BsFillBrightnessLowFill
						className="icon_white icon_l"
						onClick={toggleTheme}
					/>
				) : (
					<BsFillMoonStarsFill
						className="icon_white icon_m"
						onClick={toggleTheme}
					/>
				)}
				<LngSwitcher />
			</nav>
		</header>
	);
};

export default Header;
