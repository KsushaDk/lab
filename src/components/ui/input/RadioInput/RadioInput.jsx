import React from 'react';
import PropTypes from 'prop-types';
import './RadioInput.scss';

export const RadioInput = ({ option }) => {
	const checkClass = option.checked
		? 'radio_checkmark checked-radio'
		: 'radio_checkmark';

	return (
		<div className="radio__wrapper">
			<div className={checkClass} />
			<span className="radio_span">{option.title}</span>
		</div>
	);
};

RadioInput.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		checked: PropTypes.bool,
		completed: PropTypes.bool,
	}),
};

RadioInput.defaultProps = {
	option: undefined,
};
