import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { removeItemByQuery } from 'Utils/removeItemByQuery';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';

export const CheckboxQuestion = ({
	questionId,
	title,
	options,
	handleCheckboxQuestion,
}) => {
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [selectedID, setSelectedID] = useState([]);

	const [isEditMode, setIsEditMode] = useState(false);
	const [answerIDToEdit, setAnswerIDToEdit] = useState(undefined);

	const handleEdit = (id) => {
		setIsEditMode(true);
		setAnswerIDToEdit(id);
	};

	const handleCheckboxAnswer = (e) => {
		if (selectedID.includes(e.target.id)) {
			const newSelectedAnswers = removeItemByQuery(
				selectedAnswers,
				e.target.id
			);
			setSelectedAnswers(newSelectedAnswers);
		} else {
			const selectedAnswer = options.find((query) => query.id === e.target.id);
			setSelectedAnswers([...selectedAnswers, selectedAnswer]);
		}
	};

	const handleInputChange = (e) => {
		console.log(e.target.value);
	};

	const handleCancelEditing = () => {
		setIsEditMode(false);
		setAnswerIDToEdit(undefined);
	};

	useEffect(() => {
		const selectedId = selectedAnswers.map((item) => item.id);
		setSelectedID(selectedId);
		handleCheckboxQuestion(selectedAnswers);
	}, [selectedAnswers]);

	return (
		<div className="content__body_item">
			<div className="question__head">
				{isEditMode && answerIDToEdit === questionId ? (
					<IconBtn
						type="submit"
						handleClick={() => {}}
						btnIcon={<BsCheckSquare />}
					/>
				) : (
					<IconBtn
						handleClick={() => handleEdit(questionId)}
						btnIcon={<ImPencil />}
					/>
				)}

				{isEditMode && answerIDToEdit === questionId ? (
					<IconBtn
						handleClick={() => handleCancelEditing()}
						btnIcon={<BsXSquare />}
					/>
				) : (
					<IconBtn btnIcon={<ImBin />} />
				)}
			</div>

			{isEditMode && answerIDToEdit === questionId ? (
				<input
					className="secondary_input"
					autoComplete="off"
					type="text"
					defaultValue={title}
					onChange={(e) => handleInputChange(e)}
				/>
			) : (
				<h3 className="title_xs">{title} </h3>
			)}

			<ul className="question__list" role="menu">
				{options.map((option) => (
					<li className="settings__list_option" key={option.id}>
						<CheckboxInput
							option={option}
							handleCheckbox={handleCheckboxAnswer}
							selectedID={selectedID}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

CheckboxQuestion.propTypes = {
	questionId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
		})
	).isRequired,
	handleCheckboxQuestion: PropTypes.func,
};

CheckboxQuestion.defaultProps = {
	handleCheckboxQuestion: () => {},
};
