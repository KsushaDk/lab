import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { ImBin } from 'react-icons/im';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IconBtn } from 'Components/ui/button/IconBtn/IconBtn';
import { getQuestionToRender } from 'Constants/QuestionType';
import { propTypesConst } from 'Constants/propTypesConst';
import { getQuestionType } from 'Utils/getQuestionType';

export const InterviewQuestionList = ({
	interview,
	setInterview,
	queries,
	handleRemoveInterview,
	handleRemoveQuestion,
}) => {
	const moveItem = (dragIndex, hoverIndex) => {
		const draggedItem = interview.questions[dragIndex];

		setInterview({
			...interview,
			questions: update(interview.questions, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, draggedItem],
				],
			}),
		});
	};

	return (
		<DndProvider backend={HTML5Backend}>
			{interview.questions.length !== 0 && (
				<div className="content__body_items">
					<IconBtn
						handleClick={() => handleRemoveInterview()}
						btnIcon={<ImBin />}
					/>
					{interview.questions.map(
						(question, index) =>
							getQuestionToRender(
								question,
								index,
								queries,
								handleRemoveQuestion,
								moveItem
							)[getQuestionType(question.type)]
					)}
				</div>
			)}
		</DndProvider>
	);
};

InterviewQuestionList.propTypes = {
	interview: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		questions: PropTypes.arrayOf(propTypesConst.question),
	}),
	handleRemoveInterview: PropTypes.func,
	handleRemoveQuestion: PropTypes.func,
};

InterviewQuestionList.defaultProps = {
	interview: {},
	handleRemoveInterview: () => {},
	handleRemoveQuestion: () => {},
};
