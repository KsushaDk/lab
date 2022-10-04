import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsPlusSquare } from 'react-icons/bs';
import { useItemEditing } from 'Hooks/useItemEditing';
import { getNotification } from 'Utils/getNotification';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';
import { SecondaryBtn } from '../ui/button/SecondaryBtn/SecondaryBtn';
import { SecondaryInput } from '../ui/input/SecondaryInput/SecondaryInput';
import { RadioInput } from '../ui/input/RadioInput/RadioInput';

export const QuestionWrapper = ({
	questionId,
	questionType,
	example,
	handleRemoveQuestion,
	handleAnswer,
	notification,
}) => {
	const [question, setQuestion] = useState(null);
	const [options, setOptions] = useState([
		{
			id: uuidv4(),
			title: '',
			checked: false,
			correct: false,
		},
	]);

	const getInputType = (option) =>
		questionType === 'radio' ? (
			<RadioInput option={option} />
		) : (
			<CheckboxInput option={option} />
		);

	const removeCb = (id) => {
		localStorage.removeItem(id.toString());
		setQuestion(null);
		setOptions([]);
		handleRemoveQuestion(id);
	};

	const changeCb = (fieldName, value, id) => {
		const newOptions = options.map((option) => {
			if (option.id === id) {
				option.title = value;
			}
			return option;
		});

		setOptions(newOptions);
	};

	const saveCb = (edited, id) => {
		getNotification.failed(notification);

		setQuestion({ ...edited, id, type: questionType, options });
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
		setOptions([
			...options,
			{
				id: uuidv4(),
				title: '',
				checked: false,
				correct: false,
			},
		]);
	};

	const handleCorrectAnswers = (e) => {
		if (e.target.name !== 'option') {
			const newOptions = handleAnswer(e, options);

			setOptions(newOptions);
			setQuestion({ ...question, options: newOptions });
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
					{idToEdit === questionId ? (
						<IconBtn
							handleClick={() => handleRemove(questionId)}
							btnIcon={<ImBin />}
						/>
					) : (
						<IconBtn
							handleClick={() => handleEdit(questionId)}
							btnIcon={<ImPencil />}
						/>
					)}
				</div>

				{idToEdit === questionId ? (
					<SecondaryInput
						name="question"
						id={questionId}
						placeholder="Введите вопрос..."
						defaultValue={editedItem ? editedItem.question : question?.question}
						handleBlur={handleOnChangeField}
					/>
				) : (
					<h3 className="title_xs">
						{question !== null ? question.question : 'Введите вопрос...'}
					</h3>
				)}

				<ul className="question__list" role="menu">
					{options.map((option) => (
						<li
							className="question__list_option"
							role="menuitem"
							key={option.id}
							id={option.id}
							onClick={handleCorrectAnswers}
						>
							{idToEdit === questionId || question === null ? (
								<SecondaryInput
									name="option"
									id={option.id}
									placeholder="Введите вариант ответа..."
									defaultValue={option.title}
									handleBlur={handleOnChangeField}
								/>
							) : (
								getInputType(option)
							)}
						</li>
					))}
				</ul>

				{idToEdit === questionId && (
					<div className="question__control_btn">
						<IconBtn
							handleClick={handleAddingField}
							btnIcon={<BsPlusSquare />}
						/>
						<SecondaryBtn
							btnValue="Сохранить"
							handleClick={handleSaveEditing}
						/>
						<SecondaryBtn btnValue="Отмена" handleClick={handleCancelEditing} />
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
