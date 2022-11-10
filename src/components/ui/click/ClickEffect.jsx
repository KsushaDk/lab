import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from '../portal/Portal';
import './ClickEffect.scss';

export const ClickEffect = ({ location, handleAnimationEnd }) => (
	<Portal>
		<div
			className="clickEffect"
			style={location}
			onAnimationEnd={handleAnimationEnd}
		/>
	</Portal>
);

ClickEffect.propTypes = {
	handleAnimationEnd: PropTypes.func.isRequired,
	location: PropTypes.shape({ top: PropTypes.string, left: PropTypes.string })
		.isRequired,
};
