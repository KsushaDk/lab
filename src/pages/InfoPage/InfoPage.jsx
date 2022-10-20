import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './InfoPage.scss';

export const InfoPage = () => {
	const location = useLocation();

	return (
		<div className="page_info">
			{location.state.message}
			&nbsp;
			<Link to={location.state.link} className="page_info_link">
				сюда
			</Link>
			.
		</div>
	);
};
