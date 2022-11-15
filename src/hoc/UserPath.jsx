import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getUserData } from 'Utils/getUserData';

const ErrorPage = React.lazy(() => import('Pages/ErrorPage/ErrorPage'));

export const UserPath = ({ children }) => {
	const { t } = useTranslation();

	const { currentUser } = getUserData();

	if (currentUser.role === t('signUpForm.user')) {
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
