import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxQuestionExample } from './CheckboxQuestionExample';
import { QuestionWrapper } from './QuestionWrapper';

export const CheckboxQuestion = ({
	questionId,
	questionType,
	handleRemoveQuestion,
}) => (
	<QuestionWrapper
		questionId={questionId}
		questionType={questionType}
		example={<CheckboxQuestionExample />}
		handleRemoveQuestion={handleRemoveQuestion}
	/>
);

CheckboxQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
};
