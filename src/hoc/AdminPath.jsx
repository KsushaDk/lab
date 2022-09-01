import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminPath = ({ children }) => {
	const location = useLocation();
	const { user } = useAuth();

	if (user.username === '') {
		return <Navigate to="/signup" state={{ from: location }} />;
	}

	return children;
};

AdminPath.propTypes = {
	children: PropTypes.node,
};

AdminPath.defaultProps = {
	children: null,
};
