import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';
import { getUserData } from 'Utils/getUserData';

export const UserPath = ({ children }) => {
	const { t } = useTranslation();

	const { currentUser } = getUserData();

	if (currentUser.role === 'Пользователь') {
		return children;
	}

	return <ErrorPage link="/home" message={t('infoMessage.notAccess')} />;
};

UserPath.propTypes = {
	children: PropTypes.node,
};

UserPath.defaultProps = {
	children: null,
};
