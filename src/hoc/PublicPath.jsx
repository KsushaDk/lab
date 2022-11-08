import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getUserData } from 'Utils/getUserData';

export const PublicPath = ({ children }) => {
	const { users, currentUser } = getUserData();

	if (!currentUser || !users) {
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
