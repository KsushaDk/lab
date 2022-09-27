import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Portal = ({ children }) => {
	const el = document.createElement('div');

	useEffect(() => {
		document.body.appendChild(el);
		return () => {
			document.body.removeChild(el);
		};
	}, []);

	return ReactDOM.createPortal(children, el);
};

Portal.propTypes = {
	children: PropTypes.node.isRequired,
};
