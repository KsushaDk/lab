import React from 'react';
import PropTypes from 'prop-types';
import './PrimaryOutput.scss';

export const PrimaryOutput = ({ option }) => (
	<output className="primary_output" id={option.id}>
		{option.title}
	</output>
);

PrimaryOutput.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		checked: PropTypes.bool,
		completed: PropTypes.bool,
	}),
};

PrimaryOutput.defaultProps = {
	option: undefined,
};
