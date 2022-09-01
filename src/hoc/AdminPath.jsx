import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminPath = ({ children }) => {
	const { user } = useAuth();

	if (user.username.includes('admin')) {
		return children;
	}

	return (
		<h3 className="notfound">
			You don&apos;t have an access to this page! Go <Link to="/">home</Link>
		</h3>
	);
};

AdminPath.propTypes = {
	children: PropTypes.node,
};

AdminPath.defaultProps = {
	children: null,
};
