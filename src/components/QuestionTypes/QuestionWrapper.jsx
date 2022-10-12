import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { BsPlusSquare, BsInfo } from 'react-icons/bs';
import { propTypesConst } from 'Constants/propTypesConst';
import { DragDropItem } from 'Constants/constants';
import { checkQueryForQuestion } from 'Utils/checkQueryForQuestion';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { getNotification } from 'Utils/getNotification';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { useItemEditing } from 'Hooks/useItemEditing';
import { EditDeleteActionBtns } from '../ActionItems/EditDeleteActionBtns';
import { SaveCancelActionBtns } from '../ActionItems/SaveCancelActionBtns';
import { ActionRequiredMark } from '../ActionItems/ActionRequiredMark';
import { ActionTitle } from '../ActionItems/ActionTitle';
import { ActionInput } from '../ActionItems/ActionInput';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';

export const QuestionWrapper = ({
	question,
	questionNum,
	index,
	queries,
	moveItem,
	example,
	handleRemoveQuestion,
	handleSaveQuestion,
	handleAnswer,
	notification,
}) => {
	const [current, setCurrent] = useState(question);
	const [isExampleShown, setIsExampleShown] = useState(false);
	const [isRequired, setRequired] = useState(false);

	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: DragDropItem.QUESTION,
		hover(item) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;

			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			moveItem(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DragDropItem.QUESTION,
		item: { id: question.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	drag(drop(ref));

	const removeCb = (id) => {
		setCurrent(null);
		handleRemoveQuestion(id);
	};

	const cancelCb = () => {
		setCurrent(question);
	};

	const changeCb = (fieldName, value, id) => {
		const newOptions = current.options.map((option) => {
			if (option.id === id) {
				option.title = value;
			}
			return option;
		});

		setCurrent({ ...current, options: newOptions });
	};

	const saveCb = (edited) => {
		const checkCorrectAnswers = current.options.some(
			(option) => option.correct === true
		);

		if (checkCorrectAnswers) {
			const newQuestion = {
				...current,
				question: edited?.question || current.question,
			};
			setCurrent(newQuestion);

			handleSaveQuestion(current.id, newQuestion);
			return true;
		}

		getNotification.failed(notification);
		return false;
	};

	const {
		idToEdit,
		editedItem,
		handleEdit,
		handleCancelEditing,
		handleRemove,
		handleOnChangeField,
		handleSaveEditing,
	} = useItemEditing({ removeCb, saveCb, cancelCb, changeCb });

	const handleCorrectAnswers = (id) => {
		const newOptions = handleAnswer(id, current.options);

		setCurrent({
			...current,
			options: newOptions,
		});

		getNotification.success('Ответ сохранен.');
	};

	const handleOnAddField = useCallback(() => {
		setCurrent({
			...current,
			options: [...current.options, addDefaultValue.option(question.type)],
		});
	});

	const handleOnRemoveField = (e, id) => {
		e.stopPropagation();

		const newOptions = removeFromArrByID(current.options, id);

		setCurrent({
			...current,
			options: newOptions,
		});
	};

	const handleShowExample = useCallback(() => {
		setIsExampleShown((prevState) => !prevState);
	});

	const handleRequiredField = useCallback(() => {
		setCurrent({ ...current, required: !current.required });
	});

	useEffect(() => {
		const required = checkQueryForQuestion(
			queries,
			'Звездочки обязательных полей'
		);
		setRequired(required);

		return () => setRequired(false);
	}, [queries]);

	useEffect(() => {
		handleEdit(question.id);

		setCurrent({
			...current,
			options: [...current.options, addDefaultValue.option(question.type)],
		});
	}, []);

	return (
		<div
			className={
				isDragging ? 'content__body_item dragged' : 'content__body_item'
			}
			ref={ref}
		>
			<div className="question__head">
				<EditDeleteActionBtns
					idToEdit={idToEdit}
					currentId={question.id}
					handleRemove={handleRemove}
					handleEdit={handleEdit}
				/>
				{isRequired && (
					<ActionRequiredMark
						idToEdit={idToEdit}
						currentId={question.id}
						currentItem={current}
						handleRequiredField={handleRequiredField}
					/>
				)}
				<BsInfo
					className="icon_black"
					onMouseOver={handleShowExample}
					onMouseOut={handleShowExample}
				/>
				{isExampleShown && example}
			</div>

			<ActionTitle
				queries={queries}
				idToEdit={idToEdit}
				currentId={question.id}
				currentNum={questionNum}
				defaultValue={editedItem ? editedItem.question : current?.question}
				title={current.question === '' ? 'Введите вопрос...' : current.question}
				handleOnChangeField={handleOnChangeField}
			/>

			<ul className="question__list" role="menu">
				{current.options.map((option) => (
					<li
						className="question__list_option"
						role="menuitem"
						key={option.id}
						id={option.id}
					>
						<ActionInput
							idToEdit={idToEdit}
							currentId={question.id}
							question={current}
							option={option}
							type={question.type}
							handleRemove={handleOnRemoveField}
							handleCorrect={handleCorrectAnswers}
							handleOnChangeField={handleOnChangeField}
						/>
					</li>
				))}
				{idToEdit === question.id && question.type !== 'text' && (
					<li
						className="question__list_option p_info"
						role="menuitem"
						onClick={handleOnAddField}
					>
						<IconBtn btnIcon={<BsPlusSquare />} />
						Добавить ответ...
					</li>
				)}
			</ul>

			{idToEdit === question.id && (
				<div className="question__control_btn">
					<SaveCancelActionBtns
						handleSaveEditing={handleSaveEditing}
						handleCancelEditing={handleCancelEditing}
					/>
				</div>
			)}
		</div>
	);
};

QuestionWrapper.propTypes = {
	index: PropTypes.number,
	queries: PropTypes.arrayOf(propTypesConst.query),
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	notification: PropTypes.string,
	example: PropTypes.node,
	handleRemoveQuestion: PropTypes.func,
	handleSaveQuestion: PropTypes.func,
	handleAnswer: PropTypes.func,
	moveItem: PropTypes.func,
};

QuestionWrapper.defaultProps = {
	index: 0,
	queries: [],
	question: {},
	questionNum: 0,
	notification: '',
	example: null,
	handleRemoveQuestion: () => {},
	handleSaveQuestion: () => {},
	handleAnswer: () => {},
	moveItem: () => {},
};
