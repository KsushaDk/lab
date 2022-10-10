import React from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
import { QuestionWrapper } from './QuestionWrapper';
import { TextQuestionExample } from './TextQuestionExample';

export const TextQuestion = ({
	question,
	questionNum,
	index,
	moveItem,
	handleRemoveQuestion,
}) => {
	const handleTextAnswer = (edited, current) => {
		const newOptions = current.options.map((option) => {
			option.checked = true;
			option.correct = true;
			return option;
		});
		return { ...current, question: edited.question, options: newOptions };
	};

	return (
		<QuestionWrapper
			question={question}
			questionNum={questionNum}
			index={index}
			moveItem={moveItem}
			example={<TextQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleTextAnswer}
			notification="Выберете правильный вариант ответа."
		/>
	);
};

TextQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	handleRemoveQuestion: PropTypes.func,
};

TextQuestion.defaultProps = {
	question: {},
	questionNum: 0,
	handleRemoveQuestion: () => {},
};
