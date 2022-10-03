import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsPlusSquare } from 'react-icons/bs';
import { questionCheckbox } from 'Constants/constants';
import { useItemEditing } from 'Hooks/useItemEditing';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';
import { SecondaryBtn } from '../ui/button/SecondaryBtn/SecondaryBtn';
import { SecondaryInput } from '../ui/input/SecondaryInput/SecondaryInput';

export const CheckboxQuestion = ({ questionId }) => {
	const [question, setQuestion] = useState(null);
	const [options, setOptions] = useState([]);

	const removeCb = (id) => {
		localStorage.removeItem(id.toString());
	};

	const changeCb = (fieldName, value) => {
		if (fieldName === 'option') {
			setOptions([
				{
					id: uuidv4(),
					title: value,
					checked: false,
					correct: false,
				},
				...options,
			]);
		}
	};

	const saveCb = (edited, id) => {
		setQuestion({ ...edited, id, options });
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

	const handleAdding = () => {
		console.log('handle add');
	};
	// const handleCheckboxAnswer = (e) => {
	// 	const updatedOptions = toggleValueByKey(
	// 		options,
	// 		e.currentTarget.id,
	// 		'correct'
	// 	);

	// 	setOptions(updatedOptions);
	// };

	useEffect(() => {
		question !== null &&
			localStorage.setItem(questionId.toString(), JSON.stringify(question));
	}, [question]);

	return (
		<>
			<div className="content__body_item">
				<h3 className="title_xs">Пример: {questionCheckbox.question}</h3>
				<ul className="question__list" role="menu">
					{questionCheckbox.options.map((option) => (
						<li
							className="settings__list_option"
							key={option.id}
							id={option.id}
							role="menuitem"
						>
							<CheckboxInput option={option} />
						</li>
					))}
				</ul>
			</div>

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
					{idToEdit === questionId || question === null ? (
						<li className="settings__list_option" role="menuitem">
							<SecondaryInput
								name="option"
								id={questionId}
								placeholder="Введите вариант ответа..."
								defaultValue={options.length !== 0 ? options[0].title : ''}
								handleBlur={handleOnChangeField}
							/>
						</li>
					) : (
						<CheckboxInput option={question.options[0]} />
					)}
				</ul>

				{idToEdit === questionId && (
					<div className="question__control_btn">
						<IconBtn handleClick={handleAdding} btnIcon={<BsPlusSquare />} />
						<SecondaryBtn btnValue="Отмена" handleClick={handleCancelEditing} />
						<SecondaryBtn
							btnValue="Сохранить"
							handleClick={handleSaveEditing}
						/>
					</div>
				)}
			</div>
		</>
	);
};

CheckboxQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
};
