import React from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
import { infoMessage } from 'Constants/constants';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { CheckboxQuestionExample } from './CheckboxQuestionExample';
import { QuestionWrapper } from './QuestionWrapper';

export const CheckboxQuestion = ({
	question,
	questionNum,
	index,
	queries,
	moveItem,
	handleRemoveQuestion,
	handleSaveQuestion,
}) => {
	const handleCheckboxAnswer = (id, options) => {
		const newOptions = toggleValueByKey(options, id, ['correct']);
		return newOptions;
	};

	return (
		<QuestionWrapper
			question={question}
			questionNum={questionNum}
			index={index}
			moveItem={moveItem}
			queries={queries}
			example={<CheckboxQuestionExample />}
			handleRemoveQuestion={handleRemoveQuestion}
			handleSaveQuestion={handleSaveQuestion}
			handleAnswer={handleCheckboxAnswer}
			notification={infoMessage.notificationCheckbox}
		/>
	);
};

CheckboxQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	index: PropTypes.number,
	queries: PropTypes.arrayOf(propTypesConst.query),
	handleRemoveQuestion: PropTypes.func,
	handleSaveQuestion: PropTypes.func,
	moveItem: PropTypes.func,
};

CheckboxQuestion.defaultProps = {
	question: {},
	index: 0,
	queries: [],
	questionNum: 0,
	handleRemoveQuestion: () => {},
	handleSaveQuestion: () => {},
	moveItem: () => {},
};
