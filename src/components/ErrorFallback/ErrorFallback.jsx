import React from 'react';
import { useTranslation } from 'react-i18next';
import './ErrorFallback.scss';

export const ErrorFallback = ({ error }) => {
	const { t } = useTranslation();
	return (
		<div className="error_fallback__wrapper" role="alert">
			<p className="title_xs">{t('infoMessage.fetchFailed')}</p>
			<pre className="p_info-error">Error: {error.message}</pre>
		</div>
	);
};
