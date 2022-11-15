import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsCheckLg } from 'react-icons/bs';
import './CheckboxInput.scss';

export const CheckboxInput = ({ option }) => {
	const { t } = useTranslation();

	return (
		<div
			className="checkbox__wrapper"
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
			{option.key ? t(`interviewQueries.${option.key}`) : option.title}
		</div>
	);
};

CheckboxInput.propTypes = {
	option: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		title: PropTypes.string,
		checked: PropTypes.bool,
		completed: PropTypes.bool,
	}).isRequired,
};
