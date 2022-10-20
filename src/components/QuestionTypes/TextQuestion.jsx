import React from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
import { QuestionWrapper } from './QuestionWrapper';
import { TextQuestionExample } from './TextQuestionExample';

export const TextQuestion = ({
	question,
	questionNum,
	index,
	queries,
	moveItem,
	handleRemoveQuestion,
	handleSaveQuestion,
}) => (
	<QuestionWrapper
		question={question}
		questionNum={questionNum}
		index={index}
		queries={queries}
		moveItem={moveItem}
		example={<TextQuestionExample />}
		handleRemoveQuestion={handleRemoveQuestion}
		handleSaveQuestion={handleSaveQuestion}
	/>
);

TextQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	index: PropTypes.number,
	queries: PropTypes.arrayOf(propTypesConst.query),
	handleRemoveQuestion: PropTypes.func,
	handleSaveQuestion: PropTypes.func,
	moveItem: PropTypes.func,
};

TextQuestion.defaultProps = {
	question: {},
	index: 0,
	queries: [],
	questionNum: 0,
	handleRemoveQuestion: () => {},
	handleSaveQuestion: () => {},
	moveItem: () => {},
};
