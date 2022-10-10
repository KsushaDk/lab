import React from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { CheckboxQuestionExample } from './CheckboxQuestionExample';
import { QuestionWrapper } from './QuestionWrapper';

export const CheckboxQuestion = ({
	question,
	questionNum,
	index,
	moveItem,
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
			question={question}
			questionNum={questionNum}
			index={index}
			moveItem={moveItem}
			example={<CheckboxQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleAnswer={handleCheckboxAnswer}
			notification="Выберете правильные варианты ответа."
		/>
	);
};

CheckboxQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	handleRemoveQuestion: PropTypes.func,
};

CheckboxQuestion.defaultProps = {
	question: {},
	questionNum: 0,
	handleRemoveQuestion: () => {},
};
