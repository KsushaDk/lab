import React from 'react';
import PropTypes from 'prop-types';
import { questionTypeList } from 'Constants/constants';
import { selectElByKeyDown } from 'Utils/selectElByKeyDown';

export const QuestionTypeList = ({ handleAddQuestion }) => (
	<div className="interview__settings">
		<h3 className="title_xs">Тип вопроса</h3>
		<ul className="settings__list" onClick={handleAddQuestion} role="menu">
			{questionTypeList.map((questionType, index) => (
				<li
					className="settings__list_option"
					name={questionType.type}
					id={questionType.id}
					index={index}
					key={questionType.id}
					role="menuitem"
					tabIndex={0}
					onKeyDown={(e) => {
						selectElByKeyDown(e, handleAddQuestion, questionTypeList);
					}}
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
