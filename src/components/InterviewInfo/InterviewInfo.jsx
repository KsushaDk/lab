import React from 'react';
import PropTypes from 'prop-types';
import './InterviewInfo.scss';

export const InterviewInfo = ({ questions, pages }) => (
	<div className="interview__info">
		<p className="p_secondary">Вопросов&#x3a; {questions}</p>
		<p className="p_secondary">Страниц&#x3a; {pages}</p>
	</div>
);

InterviewInfo.propTypes = {
	questions: PropTypes.number.isRequired,
	pages: PropTypes.number.isRequired,
};
