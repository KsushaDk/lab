import React from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
import { QuestionWrapper } from './QuestionWrapper';
import { RadioQuestionExample } from './RadioQuestionExample';

export const RadioQuestion = ({
	question,
	questionNum,
	index,
	queries,
	moveItem,
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
			question={question}
			questionNum={questionNum}
			index={index}
			queries={queries}
			moveItem={moveItem}
			example={<RadioQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleRadioAnswer}
			notification="Выберете правильный вариант ответа."
		/>
	);
};

RadioQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	handleRemoveQuestion: PropTypes.func,
};

RadioQuestion.defaultProps = {
	question: {},
	questionNum: 0,
	handleRemoveQuestion: () => {},
};
