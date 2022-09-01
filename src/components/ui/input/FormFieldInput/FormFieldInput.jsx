import React from 'react';
import PropTypes from 'prop-types';
import './FormFieldInput.scss';

export const FormFieldInput = ({ id, ...attrs }) => (
	<input className="form__field" name={id} {...attrs} />
);

FormFieldInput.propTypes = {
	id: PropTypes.string.isRequired,
};
