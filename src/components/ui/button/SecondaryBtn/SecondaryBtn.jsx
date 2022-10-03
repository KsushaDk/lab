import React from 'react';
import PropTypes from 'prop-types';
import './SecondaryBtn.scss';

export const SecondaryBtn = ({ btnValue, handleClick }) => (
	<button
		className="secondary_btn"
		type="button"
		onClick={(e) => handleClick(e)}
	>
		{btnValue}
	</button>
);

SecondaryBtn.propTypes = {
	btnValue: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
};

SecondaryBtn.defaultProps = {
	handleClick: () => {},
};
