import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ErrorPage.scss';

const ErrorPage = ({ link, message }) => {
	const { t } = useTranslation();

	return (
		<h3 className="title_m page_error">
			{message}&nbsp;
			<Link to={link} className="title_m">
				{t('header.about')}
			</Link>
		</h3>
	);
};

ErrorPage.propTypes = {
	link: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

export default ErrorPage;
