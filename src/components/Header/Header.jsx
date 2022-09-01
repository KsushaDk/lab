import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import logo from './logo.svg';
import './Header.scss';

export const Header = () => {
	const { user } = useAuth();

	return (
		<header className="header">
			<Link className="header__logo" to="/">
				<img src={logo} alt="ITechArt Logo" />
			</Link>
			<nav className="header__nav">
				<NavLink
					to="/home"
					className={({ isActive }) => (isActive ? 'active' : '')}
				>
					О компании
				</NavLink>
				{!user.username ? (
					<NavLink
						to="/login"
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						Вход
					</NavLink>
				) : (
					<span>Привет, {user.username}!</span>
				)}
			</nav>
		</header>
	);
};
