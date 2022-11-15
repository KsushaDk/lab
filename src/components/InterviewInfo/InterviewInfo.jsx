import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './InterviewInfo.scss';

const InterviewInfo = ({ questions, pages }) => {
	const { t } = useTranslation();

	return (
		<div className="interview__info">
			<p className="p_secondary">
				{t('createInterview.infoQuestion')}&#x3a; {questions}
			</p>
			<p className="p_secondary">
				{t('createInterview.infoPages')}&#x3a; {pages}
			</p>
		</div>
	);
};

InterviewInfo.propTypes = {
	questions: PropTypes.number.isRequired,
	pages: PropTypes.number.isRequired,
};

export default InterviewInfo;
