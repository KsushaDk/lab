import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({ username: '', password: '', email: '' });

	const signup = (newUser, cb) => {
		console.log(newUser);
		setUser(newUser);
		cb();
	};

	const signout = (cb) => {
		setUser(null);
		cb();
	};

	const value = { user, signup, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
