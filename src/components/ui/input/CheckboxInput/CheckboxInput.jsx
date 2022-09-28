import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsCheckLg } from 'react-icons/bs';
import './CheckboxInput.scss';

export const CheckboxInput = ({ option, handleCheckbox, selectedID }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(selectedID.includes(option.id));
	}, [selectedID]);

	return (
		<div
			className="checkbox__wrapper"
			id={option.id}
			onClick={(e) => handleCheckbox(e)}
			role="checkbox"
			aria-checked={isChecked}
			tabIndex={-1}
		>
			<div
				id={option.id}
				className={
					isChecked ? 'checkbox__checkmark checked' : 'checkbox__checkmark'
				}
			>
				{isChecked && <BsCheckLg />}
			</div>
			{option.title}
		</div>
	);
};

CheckboxInput.propTypes = {
	option: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		title: PropTypes.string,
		completed: PropTypes.bool,
	}).isRequired,
	selectedID: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	),
	handleCheckbox: PropTypes.func,
};

CheckboxInput.defaultProps = {
	handleCheckbox: () => {},
	selectedID: [],
};
