import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBtn.scss';

export const NavBtn = ({ btnValue }) => {
	const navigate = useNavigate();

	const handleClick = (link) => {
		navigate(link);
	};

	return (
		<button
			className="nav_btn "
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
