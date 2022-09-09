import React from 'react';
import PropTypes from 'prop-types';
import './PrimarySelect.scss';

export const PrimarySelect = ({
	defaultValue,
	options,
	hangleSelectChange,
	name,
}) => (
	<form>
		<select
			className="primary_select"
			onChange={hangleSelectChange}
			name={name}
			defaultValue={defaultValue}
		>
			{options.map((option) => (
				<option key={option} value={option.toString()}>
					{option}
				</option>
			))}
		</select>
	</form>
);

PrimarySelect.propTypes = {
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	hangleSelectChange: PropTypes.func.isRequired,
};
