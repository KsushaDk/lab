import React from 'react';
import PropTypes from 'prop-types';
import './SecondaryBtn.scss';

const SecondaryBtn = ({ btnValue, handleClick, isActive, ...attrs }) => (
	<button
		className={
			isActive ? 'secondary_btn active_secondary_btn' : 'secondary_btn'
		}
		type="button"
		onClick={(e) => handleClick(e)}
		{...attrs}
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

export default SecondaryBtn;
