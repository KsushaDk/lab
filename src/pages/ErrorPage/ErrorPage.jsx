import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export const ErrorPage = ({ link, message }) => (
	<h3 className="title_m page_error">
		{message}
		<Link to={link} className="title_m">
			{link.slice(1)}
		</Link>
	</h3>
);

ErrorPage.propTypes = {
	link: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};
