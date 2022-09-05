import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBtn.scss';

export const NavBtn = ({ btnValue }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname.split('/');

	const handleClick = (link) => {
		navigate(link);
	};

	return (
		<button
			className={
				path[path.length - 1] === btnValue.link
					? 'nav_btn active_btn'
					: 'nav_btn'
			}
			type="button"
			onClick={() => handleClick(btnValue.link)}
		>
			{btnValue.value}
		</button>
	);
};

NavBtn.propTypes = {
	btnValue: PropTypes.shape({
		value: PropTypes.string,
		link: PropTypes.string,
	}).isRequired,
};
