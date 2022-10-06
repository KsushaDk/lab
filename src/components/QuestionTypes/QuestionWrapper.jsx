import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsPlusSquare } from 'react-icons/bs';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { getNotification } from 'Utils/getNotification';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { useItemEditing } from 'Hooks/useItemEditing';
import { EditDeleteActionBtns } from '../ActionItems/EditDeleteActionBtns';
import { SaveCancelActionBtns } from '../ActionItems/SaveCancelActionBtns';
import { ActionTitle } from '../ActionItems/ActionTitle';
import { ActionInput } from '../ActionItems/ActionInput';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';

export const QuestionWrapper = ({
	questionId,
	questionType,
	example,
	handleRemoveQuestion,
	handleAnswer,
	notification,
}) => {
	const [question, setQuestion] = useState(
		addDefaultValue.question(questionId, questionType)
	);

	const removeCb = (id) => {
		localStorage.removeItem(id.toString());
		setQuestion(null);
		handleRemoveQuestion(id);
	};

	const changeCb = (fieldName, value, id) => {
		const newOptions = question.options.map((option) => {
			if (option.id === id) {
				option.title = value;
			}
			return option;
		});

		setQuestion({ ...question, id, type: questionType, options: newOptions });
	};

	const saveCb = (edited, id) => {
		if (questionType === 'text') {
			const newQuestion = handleAnswer(edited, id, question.options);
			setQuestion(newQuestion);
		} else {
			getNotification.failed(notification);
			setQuestion({
				...edited,
				id,
				type: questionType,
				options: question.options,
			});
		}
	};

	const {
		idToEdit,
		editedItem,
		handleEdit,
		handleCancelEditing,
		handleRemove,
		handleOnChangeField,
		handleSaveEditing,
	} = useItemEditing({ removeCb, saveCb, changeCb });

	const handleAddingField = () => {
		setQuestion({
			...question,
			options: [...question.options, addDefaultValue.option()],
		});
	};

	const handleRemovingField = (e, id) => {
		e.stopPropagation();

		const newOptions = removeFromArrByID(question.options, id);

		setQuestion({
			...question,
			options: newOptions,
		});
	};

	const handleCorrectAnswers = (e) => {
		if (questionType !== 'text' && e.target.name !== 'option') {
			const newOptions = handleAnswer(e, question.options);

			setQuestion({
				...question,
				options: newOptions,
			});

			getNotification.success('Ответ сохранен.');
		}
	};

	useEffect(() => {
		question !== null &&
			localStorage.setItem(questionId.toString(), JSON.stringify(question));
	}, [question]);

	useEffect(() => {
		handleEdit(questionId);
	}, []);

	return (
		<>
			{example}
			<div className="content__body_item">
				<div className="question__head">
					<EditDeleteActionBtns
						idToEdit={idToEdit}
						currentId={questionId}
						handleRemove={handleRemove}
						handleEdit={handleEdit}
					/>
				</div>

				<ActionTitle
					idToEdit={idToEdit}
					currentId={questionId}
					defaultValue={editedItem ? editedItem.question : question?.question}
					title={
						question.question === '' ? 'Введите вопрос...' : question.question
					}
					handleOnChangeField={handleOnChangeField}
				/>

				<ul className="question__list" role="menu">
					{question.options.map((option) => (
						<li
							className="question__list_option"
							role="menuitem"
							key={option.id}
							id={option.id}
							onClick={handleCorrectAnswers}
						>
							<ActionInput
								idToEdit={idToEdit}
								currentId={questionId}
								question={question}
								option={option}
								type={questionType}
								handleRemove={handleRemovingField}
								handleOnChangeField={handleOnChangeField}
							/>
						</li>
					))}
					{idToEdit === questionId && questionType !== 'text' && (
						<li
							className="question__list_option p_info"
							role="menuitem"
							onClick={handleAddingField}
						>
							<IconBtn btnIcon={<BsPlusSquare />} />
							Добавить ответ...
						</li>
					)}
				</ul>

				{idToEdit === questionId && (
					<div className="question__control_btn">
						<SaveCancelActionBtns
							handleSaveEditing={handleSaveEditing}
							handleCancelEditing={handleCancelEditing}
						/>
					</div>
				)}
			</div>
		</>
	);
};

QuestionWrapper.propTypes = {
	questionId: PropTypes.string,
	notification: PropTypes.string,
	questionType: PropTypes.string,
	example: PropTypes.node,
	handleRemoveQuestion: PropTypes.func,
	handleAnswer: PropTypes.func,
};

QuestionWrapper.defaultProps = {
	notification: '',
	questionId: null,
	questionType: null,
	example: null,
	handleRemoveQuestion: () => {},
	handleAnswer: () => {},
};
