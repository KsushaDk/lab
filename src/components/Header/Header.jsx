import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ImUser } from 'react-icons/im';
import { useAuth } from 'Hooks/useAuth';
import logo from './logo.svg';
import './Header.scss';

export const Header = () => {
	const { user } = useAuth();

	return (
		<header className="header">
			<Link className="primary_logo" to="/home">
				<img src={logo} alt="ITechArt Logo" />
			</Link>
			<nav className="nav__links">
				<NavLink
					to="/home"
					className={({ isActive }) => (isActive ? 'active' : '')}
				>
					О компании
				</NavLink>
				{!user.username ? (
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						Вход
					</NavLink>
				) : (
					<div className="nav__user">
						<ImUser /> <span>Привет, {user.username}!</span>
					</div>
				)}
			</nav>
		</header>
	);
};
