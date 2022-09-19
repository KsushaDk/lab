import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUsers } from 'Hooks/useUsers';

export const PublicPath = ({ children }) => {
	const { currentUser } = useUsers();

	if (currentUser === null) {
		return <Navigate to="/" replace />;
	}
	return children;
};

PublicPath.propTypes = {
	children: PropTypes.node,
};

PublicPath.defaultProps = {
	children: null,
};
