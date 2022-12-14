import React from 'react';
import PropTypes from 'prop-types';
import './IconBtn.scss';

export const IconBtn = ({ btnIcon, handleClick, type = 'button', ...args }) => (
	<button
		className="icon_btn icon_m"
		type={type}
		aria-label="icon"
		{...args}
		onClick={handleClick}
	>
		{btnIcon}
	</button>
);

IconBtn.propTypes = {
	btnIcon: PropTypes.node.isRequired,
	handleClick: PropTypes.func,
};

IconBtn.defaultProps = {
	handleClick: () => {},
};
