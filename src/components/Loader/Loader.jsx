import React from 'react';
import './Loader.scss';

const Loader = () => (
	<div className="loader_wrapper">
		<svg className="loader_svg" viewBox="25 25 50 50">
			<circle className="loader_circle" cx="50" cy="50" r="20" />
		</svg>
	</div>
);

export default Loader;
