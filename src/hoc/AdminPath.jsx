import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getUserData } from 'Utils/getUserData';

const ErrorPage = React.lazy(() => import('Pages/ErrorPage/ErrorPage'));

export const AdminPath = ({ children }) => {
	const { t } = useTranslation();

	const { currentUser } = getUserData();

	if (currentUser.role === t('signUpForm.admin')) {
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
