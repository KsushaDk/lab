import React from 'react';
import PropTypes from 'prop-types';
import { EnterError } from '../../../EnterError/EnterError';
import './PrimaryInput.scss';

export const PrimaryInput = ({ name, register, rules, errors, ...attrs }) => (
	<>
		{errors[name] !== undefined && (
			<EnterError err={errors[name].message || 'error'} />
		)}
		<input
			className="primary_input"
			name={name}
			{...attrs}
			{...(register && register(name, rules))}
		/>
	</>
);

PrimaryInput.propTypes = {
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
