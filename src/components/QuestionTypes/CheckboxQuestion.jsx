import React from 'react';
import PropTypes from 'prop-types';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { CheckboxQuestionExample } from './CheckboxQuestionExample';
import { QuestionWrapper } from './QuestionWrapper';

export const CheckboxQuestion = ({
	questionId,
	questionType,
	handleRemoveQuestion,
}) => {
	const handleCheckboxAnswer = (e, options) => {
		const newOptions = toggleValueByKey(options, e.currentTarget.id, [
			'checked',
			'correct',
		]);
		return newOptions;
	};

	return (
		<QuestionWrapper
			questionId={questionId}
			questionType={questionType}
			example={<CheckboxQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleCheckboxAnswer}
			notification="Выберете правильные варианты ответа."
		/>
	);
};

CheckboxQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
};
