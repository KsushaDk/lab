import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ImUser } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowRight } from 'react-icons/bs';
import { logoutUser } from 'Redux/slices/userSlice';
import { useUsers } from 'Hooks/useUsers';
import { LngSwitcher } from '../LngSwitcher/LngSwitcher';
import logo from './logo.svg';
import './Header.scss';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const { currentUser } = useUsers();

	const logout = () => {
		dispatch(logoutUser());
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

				{currentUser === null ? (
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
						<ImUser className="icon_white icon_m" />
						<span className="nav__user_name">
							{t('header.greeting')},&nbsp;{currentUser.username}!
						</span>
						<BsBoxArrowRight className="icon_white icon_l" onClick={logout} />
					</div>
				)}
				<LngSwitcher />
			</nav>
		</header>
	);
};
