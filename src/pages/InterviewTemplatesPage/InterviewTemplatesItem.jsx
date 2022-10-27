import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { dammyText } from 'Constants/constants';

export const InterviewTemplatesItem = ({ template }) => (
	<div className="content__card">
		<h3 className="title_s">{template.title}</h3>
		<p className="p_primary">{dammyText}</p>
		<InterviewInfo pages={template.pages} questions={template.questions} />
		<PrimaryBtn btnValue={{ key: 'createTemplate', link: 'create-template' }} />
	</div>
);

InterviewTemplatesItem.propTypes = {
	template: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		questions: PropTypes.number,
		pages: PropTypes.number,
	}).isRequired,
};
