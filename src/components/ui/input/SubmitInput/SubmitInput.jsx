import React from 'react';
import PropTypes from 'prop-types';
import './SubmitInput.scss';

export const SubmitInput = ({ isValid, btnValue, ...attrs }) => (
	<input
		className="submit_input"
		type="submit"
		value={btnValue}
		disabled={!isValid}
		{...attrs}
	/>
);

SubmitInput.propTypes = {
	isValid: PropTypes.bool.isRequired,
	btnValue: PropTypes.string.isRequired,
};
