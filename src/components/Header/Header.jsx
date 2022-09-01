import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './Header.scss';

const Header = () => (
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
			<NavLink
				to="/login"
				className={({ isActive }) => (isActive ? 'active' : '')}
			>
				Вход
			</NavLink>
		</nav>
	</header>
);

export default React.memo(Header);
