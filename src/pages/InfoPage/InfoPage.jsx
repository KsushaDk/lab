import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './InfoPage.scss';

const InfoPage = () => {
	const location = useLocation();
	const { t } = useTranslation();

	return (
		<div className="page_info">
			{location.state.message}
			&nbsp;
			<Link to={location.state.link} className="page_info_link">
				{t(`infoMessage.here`)}
			</Link>
			.
		</div>
	);
};

export default InfoPage;
