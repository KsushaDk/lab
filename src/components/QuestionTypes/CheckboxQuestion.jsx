import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { propTypesConst } from 'Constants/propTypesConst';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { QuestionWrapper } from './QuestionWrapper';

const CheckboxQuestionExample = React.lazy(() =>
	import('./CheckboxQuestionExample')
);

const CheckboxQuestion = ({
	question,
	questionNum,
	index,
	queries,
	moveItem,
	handleRemoveQuestion,
	handleSaveQuestion,
}) => {
	const { t } = useTranslation();

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
			notification={t('infoMessage.notificationCheckbox')}
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

export default CheckboxQuestion;
