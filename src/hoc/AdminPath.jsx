import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'Hooks/useAuth';
import { ErrorPage } from 'Pages/ErrorPage/ErrorPage';

export const AdminPath = ({ children }) => {
	const { currentUser } = useAuth();

	if (currentUser.role === 'Администратор') {
		return children;
	}

	return (
		<ErrorPage
			link="/home"
			message="You don't have an access to this page! Go&nbsp;"
		/>
	);
};

AdminPath.propTypes = {
	children: PropTypes.node,
};

AdminPath.defaultProps = {
	children: null,
};
