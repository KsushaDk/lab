import React from 'react';
import PropTypes from 'prop-types';
import { questionTypeList } from 'Constants/constants';

export const QuestionTypeList = ({ handleAddQuestion }) => (
	<div className="interview__settings">
		<h3 className="title_xs">Тип вопроса</h3>
		<ul className="settings__list" onClick={handleAddQuestion} role="menu">
			{questionTypeList.map((questionType) => (
				<li
					className="settings__list_option"
					name={questionType.type}
					key={questionType.id}
				>
					{questionType.icon} {questionType.title}
				</li>
			))}
		</ul>
	</div>
);

QuestionTypeList.propTypes = {
	handleAddQuestion: PropTypes.func,
};

QuestionTypeList.defaultProps = {
	handleAddQuestion: () => {},
};
