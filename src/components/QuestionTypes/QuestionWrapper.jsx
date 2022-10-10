import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { BsPlusSquare, BsInfo } from 'react-icons/bs';
import { propTypesConst } from 'Constants/propTypesConst';
import { DragDropItem } from 'Constants/constants';
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
		localStorage.removeItem(id.toString());
		setCurrent(null);
		handleRemoveQuestion(id);
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
		if (question.type === 'text') {
			const newQuestion = handleAnswer(edited, current);
			setCurrent(newQuestion);
		} else {
			getNotification.failed(notification);
			setCurrent({
				...current,
				question: edited.question,
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

	const handleAddingField = useCallback(() => {
		setCurrent({
			...current,
			options: [...current.options, addDefaultValue.option()],
		});
	});

	const handleRemovingField = (e, id) => {
		e.stopPropagation();

		const newOptions = removeFromArrByID(current.options, id);

		setCurrent({
			...current,
			options: newOptions,
		});
	};

	const handleCorrectAnswers = (e) => {
		if (question.type !== 'text' && e.target.name !== 'option') {
			const newOptions = handleAnswer(e, current.options);

			setCurrent({
				...current,
				options: newOptions,
			});

			getNotification.success('Ответ сохранен.');
		}
	};

	const handleShowExample = useCallback(() => {
		setIsExampleShown((prevState) => !prevState);
	});

	const handleRequiredField = useCallback(() => {
		setCurrent({ ...current, required: !current.required });
	});

	useEffect(() => {
		current !== null &&
			localStorage.setItem(question.id.toString(), JSON.stringify(current));
	}, [current]);

	useEffect(() => {
		handleEdit(question.id);
		setCurrent({
			...current,
			options: [...current.options, addDefaultValue.option()],
		});
	}, []);

	useEffect(() => {
		queries.forEach((query) => {
			if (
				query.checked === true &&
				query.title === 'Звездочки обязательных полей'
			) {
				setRequired(true);
			}
		});
		return () => setRequired(false);
	}, [queries]);

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
						onClick={handleCorrectAnswers}
					>
						<ActionInput
							idToEdit={idToEdit}
							currentId={question.id}
							question={current}
							option={option}
							type={question.type}
							handleRemove={handleRemovingField}
							handleOnChangeField={handleOnChangeField}
						/>
					</li>
				))}
				{idToEdit === question.id && question.type !== 'text' && (
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
	question: propTypesConst.question,
	questionNum: PropTypes.number,
	notification: PropTypes.string,
	example: PropTypes.node,
	handleRemoveQuestion: PropTypes.func,
	handleAnswer: PropTypes.func,
};

QuestionWrapper.defaultProps = {
	question: {},
	questionNum: 0,
	notification: '',
	example: null,
	handleRemoveQuestion: () => {},
	handleAnswer: () => {},
};
