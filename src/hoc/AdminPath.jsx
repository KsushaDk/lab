import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUsers } from 'Hooks/useUsers';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';

export const AdminPath = ({ children }) => {
	const { currentUser } = useUsers();

	const { t } = useTranslation();

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
