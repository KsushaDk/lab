import React from 'react';
import PropTypes from 'prop-types';
import './EnterError.scss';

export const EnterError = ({ err }) => <div className="enter_error">{err}</div>;

EnterError.propTypes = {
	err: PropTypes.string.isRequired,
};
