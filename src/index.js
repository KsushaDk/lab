import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './hoc/ThemeProvider';
import App from './components/App/App';
import './i18n';
import './scss/index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Router>
		<ThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</Router>
);
