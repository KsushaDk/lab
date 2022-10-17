import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

export const ProgressBar = ({ length, percent }) => (
	<div className="progress-bar__wrapper">
		<div className="progress-bar__state">
			{Math.floor((length * percent) / 100)}
			&#47;{length}
		</div>

		<div className="progress-bar-unfill">
			<span className="progress-bar-fill" style={{ width: `${percent}%` }} />
		</div>
		<div className="progress-bar__state">{percent}%</div>
	</div>
);

ProgressBar.propTypes = {
	length: PropTypes.number.isRequired,
	percent: PropTypes.number.isRequired,
};
