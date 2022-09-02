import React from 'react';
import PropTypes from 'prop-types';
import './SubmitInput.scss';

export const SubmitInput = ({ isValid, ...attrs }) => (
	<input
		className="submit_input"
		type="submit"
		disabled={!isValid}
		{...attrs}
	/>
);

SubmitInput.propTypes = {
	isValid: PropTypes.bool.isRequired,
};
