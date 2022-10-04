import React from 'react';
import PropTypes from 'prop-types';
import './SecondaryInput.scss';

export const SecondaryInput = ({ name, handleBlur, ...attrs }) => (
	<input
		className="secondary_input"
		autoComplete="off"
		type="text"
		name={name}
		onBlur={handleBlur}
		{...attrs}
	/>
);

SecondaryInput.propTypes = {
	name: PropTypes.string.isRequired,
	handleBlur: PropTypes.func,
};

SecondaryInput.defaultProps = {
	handleBlur: () => {},
};
