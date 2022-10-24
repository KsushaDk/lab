import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './SubmitInput.scss';

export const SubmitInput = ({ isValid, ...attrs }) => {
	const { t } = useTranslation();

	return (
		<input
			className="submit_input"
			type="submit"
			value={t('btnValues.send')}
			disabled={!isValid}
			{...attrs}
		/>
	);
};

SubmitInput.propTypes = {
	isValid: PropTypes.bool.isRequired,
};
