import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

export const Error = ({ err }) => <div className="error">{err}</div>;

Error.propTypes = {
	err: PropTypes.string.isRequired,
};
