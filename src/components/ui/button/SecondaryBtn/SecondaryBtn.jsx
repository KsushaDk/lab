import React from 'react';
import PropTypes from 'prop-types';
import './SecondaryBtn.scss';

export const SecondaryBtn = ({ btnValue, handleClick, isActive }) => (
	<button
		className={
			isActive ? 'secondary_btn active_secondary_btn' : 'secondary_btn'
		}
		type="button"
		onClick={(e) => handleClick(e)}
	>
		{btnValue}
	</button>
);

SecondaryBtn.propTypes = {
	btnValue: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	handleClick: PropTypes.func,
};

SecondaryBtn.defaultProps = {
	isActive: false,
	handleClick: () => {},
};
