// import React from 'react';
// import PropTypes from 'prop-types';
// import { useLocation, Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// export const UserPath = ({ children }) => {
// 	const location = useLocation();
// 	const { user } = useAuth();

// 	if (user.username === 'user' && user.password === '11111111') {
// 		return children;
// 	}
// 	return <Navigate to={location} />;
// };

// UserPath.propTypes = {
// 	children: PropTypes.node,
// };

// UserPath.defaultProps = {
// 	children: null,
// };
