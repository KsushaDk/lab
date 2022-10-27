import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './PrimaryBtn.scss';

export const PrimaryBtn = ({ btnValue }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname.split('/');

	const { t } = useTranslation();

	const handleClick = useCallback((link) => {
		navigate(link, { replace: true });
	});

	return (
		<button
			className={
				path[path.length - 1] === btnValue.link
					? 'primary_btn active_btn'
					: 'primary_btn'
			}
			type="button"
			onClick={() => handleClick(btnValue.link)}
		>
			{t(`btnValues.${btnValue.key}`)}
		</button>
	);
};

PrimaryBtn.propTypes = {
	btnValue: PropTypes.shape({
		value: PropTypes.string,
		link: PropTypes.string,
	}).isRequired,
};
