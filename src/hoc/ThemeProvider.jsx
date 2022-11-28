import React, { useState } from 'react';

export const ThemeContext = React.createContext({
	theme: 'light',
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
