import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'Hooks/useAuth';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';

export const UserPath = ({ children }) => {
	const { currentUser } = useAuth();

	if (currentUser.role === 'Пользователь') {
		return children;
	}

	return (
		<ErrorPage
			link="/home"
			message="You don't have an access to this page! Go&nbsp;"
		/>
	);
};

UserPath.propTypes = {
	children: PropTypes.node,
};

UserPath.defaultProps = {
	children: null,
};
