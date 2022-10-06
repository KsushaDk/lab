import React from 'react';
import PropTypes from 'prop-types';
import { QuestionWrapper } from './QuestionWrapper';
import { RadioQuestionExample } from './RadioQuestionExample';

export const RadioQuestion = ({
	questionId,
	questionType,
	handleRemoveQuestion,
}) => {
	const handleRadioAnswer = (e, options) => {
		const newOptions = options.map((item) => {
			if (item.id.toString() === e.currentTarget.id.toString()) {
				item.checked = !item.checked;
				item.correct = !item.correct;
			} else {
				item.checked = false;
				item.correct = false;
			}
			return item;
		});

		return newOptions;
	};
	return (
		<QuestionWrapper
			questionId={questionId}
			questionType={questionType}
			example={<RadioQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleRadioAnswer}
			notification="Выберете правильный вариант ответа."
		/>
	);
};

RadioQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
};
