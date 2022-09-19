import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { dammyText } from 'Utils/constants';

export const InterviewTemplatesItem = ({ template }) => (
	<div className="content__card">
		<h3 className="title_s">{template.title}</h3>
		<p className="p_primary">{dammyText}</p>
		<div className="content__card_info">
			<p className="p_secondary">Вопросов&#x3a; {template.questions}</p>
			<p className="p_secondary">Страниц&#x3a; {template.pages}</p>
		</div>

		<PrimaryBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
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
