import React from 'react';
import PropTypes from 'prop-types';
import { QuestionWrapper } from './QuestionWrapper';
import { TextQuestionExample } from './TextQuestionExample';

export const TextQuestion = ({
	questionId,
	questionType,
	handleRemoveQuestion,
}) => {
	const handleTextAnswer = (edited, id, options) => {
		const newOptions = options.map((option) => {
			option.checked = true;
			option.correct = true;
			return option;
		});
		return { ...edited, id, type: questionType, options: newOptions };
	};

	return (
		<QuestionWrapper
			questionId={questionId}
			questionType={questionType}
			example={<TextQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleTextAnswer}
			notification="Выберете правильный вариант ответа."
		/>
	);
};

TextQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
};
