import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toggleOptionClick } from 'Utils/toggleOptionClick';
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
	handleSaveQuestion,
}) => {
	const { t } = useTranslation();

	const handleRadioAnswer = (id, options) => {
		const newOptions = toggleOptionClick(options, id, question.type, 'correct');

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
			handleSaveQuestion={handleSaveQuestion}
			handleAnswer={handleRadioAnswer}
			notification={t('infoMessage.notificationRadio')}
		/>
	);
};

RadioQuestion.propTypes = {
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	index: PropTypes.number,
	queries: PropTypes.arrayOf(propTypesConst.query),
	handleRemoveQuestion: PropTypes.func,
	handleSaveQuestion: PropTypes.func,
	moveItem: PropTypes.func,
};

RadioQuestion.defaultProps = {
	question: {},
	index: 0,
	queries: [],
	questionNum: 0,
	handleRemoveQuestion: () => {},
	handleSaveQuestion: () => {},
	moveItem: () => {},
};
