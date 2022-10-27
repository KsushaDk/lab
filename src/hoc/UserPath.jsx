import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUsers } from 'Hooks/useUsers';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';

export const UserPath = ({ children }) => {
	const { currentUser } = useUsers();

	const { t } = useTranslation();

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
