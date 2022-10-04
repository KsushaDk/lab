import React from 'react';
import PropTypes from 'prop-types';
import { QuestionWrapper } from './QuestionWrapper';
import { RadioQuestionExample } from './RadioQuestionExample';

export const RadioQuestion = ({
	questionId,
	questionType,
	handleRemoveQuestion,
}) => (
	<QuestionWrapper
		questionId={questionId}
		questionType={questionType}
		example={<RadioQuestionExample />}
		handleRemoveQuestion={handleRemoveQuestion}
	/>
);

RadioQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
};
