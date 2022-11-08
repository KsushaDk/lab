import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { getUserData } from 'Utils/getUserData';

export const AdminPath = ({ children }) => {
	const { t } = useTranslation();

	const { currentUser } = getUserData();

	if (currentUser.role === 'Администратор') {
		return children;
	}

	return <ErrorPage link="/home" message={t('infoMessage.notAccess')} />;
};

AdminPath.propTypes = {
	children: PropTypes.node,
};

AdminPath.defaultProps = {
	children: null,
};
