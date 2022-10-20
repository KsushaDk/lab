import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ImUser } from 'react-icons/im';
import { BsBoxArrowRight } from 'react-icons/bs';
import { logoutUser } from 'Redux/slices/userSlice';
import { useUsers } from 'Hooks/useUsers';
import logo from './logo.svg';
import './Header.scss';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
					О компании
				</NavLink>
				{currentUser === null ? (
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? 'active link_white' : 'link_white'
						}
					>
						Вход
					</NavLink>
				) : (
					<div className="nav__user">
						<ImUser className="icon_white icon_m" />
						<span className="nav__user_name">
							Привет, {currentUser.username}!
						</span>
						<BsBoxArrowRight className="icon_white icon_l" onClick={logout} />
					</div>
				)}
			</nav>
		</header>
	);
};
