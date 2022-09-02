import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});

	const signup = (newUser, cb) => {
		setUser(newUser);
		cb();
	};

	const signout = (cb) => {
		setUser(null);
		cb();
	};

	const value = useMemo(() => ({ user, signup, signout }), [
		user,
		signup,
		signout,
	]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

AuthProvider.defaultProps = {
	children: null,
};
