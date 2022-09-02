import React from 'react';
import PropTypes from 'prop-types';
import { Error } from '../../../Error/Error';
import './FormInput.scss';

export const FormInput = ({ name, register, rules, errors, ...attrs }) => (
	<>
		{errors[name] !== undefined && (
			<Error err={errors[name].message || 'error'} />
		)}
		<input
			className="form_input"
			name={name}
			{...attrs}
			{...(register && register(name, rules))}
		/>
	</>
);

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	rules: PropTypes.shape({
		required: PropTypes.string,
		validate: PropTypes.func,
	}).isRequired,
	errors: PropTypes.shape({
		name: PropTypes.shape({
			type: PropTypes.string,
			message: PropTypes.string,
		}),
	}).isRequired,
	register: PropTypes.func.isRequired,
};
