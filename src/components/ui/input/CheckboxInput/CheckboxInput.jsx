import React from 'react';
import PropTypes from 'prop-types';
import { BsCheckLg } from 'react-icons/bs';
import './CheckboxInput.scss';

export const CheckboxInput = ({ option }) => (
	<div
		className="checkbox__wrapper"
		id={option.id}
		role="checkbox"
		aria-checked={option.checked}
		tabIndex={-1}
	>
		<div
			className={
				option.checked
					? 'checkbox__checkmark checked-box'
					: 'checkbox__checkmark'
			}
		>
			{option.checked && <BsCheckLg />}
		</div>
		{option.title}
	</div>
);

CheckboxInput.propTypes = {
	option: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		title: PropTypes.string,
		checked: PropTypes.bool,
		completed: PropTypes.bool,
	}).isRequired,
};
