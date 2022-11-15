import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';
import { BsPlusSquare, BsInfo, BsCheck2 } from 'react-icons/bs';
import { propTypesConst } from 'Constants/propTypesConst';
import { DragDropItem } from 'Constants/constants';
import { checkQueryForQuestion } from 'Utils/checkQueryForQuestion';
import { validateOptionsState } from 'Utils/validateOptionsState';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { getNotification } from 'Utils/getNotification';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { useItemEditing } from 'Hooks/useItemEditing';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';

const PrimaryDropDown = React.lazy(() =>
	import('../ui/dropdown/PrimaryDropDown')
);
const ActionRequiredMark = React.lazy(() =>
	import('../ActionItems/ActionRequiredMark')
);
const EditDeleteActionBtns = React.lazy(() =>
	import('../ActionItems/EditDeleteActionBtns')
);
const SaveCancelActionBtns = React.lazy(() =>
	import('../ActionItems/SaveCancelActionBtns')
);
const ActionTitle = React.lazy(() => import('../ActionItems/ActionTitle'));
const ActionInput = React.lazy(() => import('../ActionItems/ActionInput'));

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
	const [isRequired, setRequired] = useState(false);

	const { t } = useTranslation();

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
		setCurrent({
			...question,
			options: [addDefaultValue.option(question.type)],
		});
	};

	const changeCb = (fieldName, value, id) => {
		const newOptions = current.options.map((option) => {
			if (option.id === id) {
				question.type === 'text'
					? (option.answer = value)
					: (option.title = value);
			}
			return option;
		});

		setCurrent({ ...current, options: newOptions });
	};

	const saveCb = (edited) => {
		if (question.type === 'text') {
			const newQuestion = {
				...current,
				question: edited?.question || current.question,
			};
			setCurrent(newQuestion);

			handleSaveQuestion(current.id, newQuestion);
			return true;
		}

		const validatedOptions = validateOptionsState(
			current.options,
			notification,
			t('infoMessage.fillEmptyField')
		);

		if (validatedOptions) {
			const newQuestion = {
				...current,
				question: edited?.question || current.question,
			};
			setCurrent(newQuestion);

			handleSaveQuestion(current.id, newQuestion);
			return true;
		}
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

		getNotification.success(t('infoMessage.saveAnswer'));
	};

	const handleOnAddField = useCallback(() => {
		setCurrent({
			...current,
			options: [...current.options, addDefaultValue.option(question.type)],
		});
	});

	useEffect(() => {
		if (current.options.length > 0) {
			document
				.getElementById(current.options[current.options.length - 1].id)
				.focus();
		}
	}, [current.options.length]);

	const handleOnRemoveField = (e, id) => {
		e.stopPropagation();

		const newOptions = removeFromArrByID(current.options, id);

		setCurrent({
			...current,
			options: newOptions,
		});
	};

	const handleRequiredField = useCallback(() => {
		setCurrent({ ...current, required: !current.required });
	});

	useEffect(() => {
		const required = checkQueryForQuestion(queries, 'requiredFields');
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
			role="menuitem"
			aria-label="question"
			tabIndex={0}
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
				<PrimaryDropDown trigger={<BsInfo className="icon_black icon_l" />}>
					{example}
				</PrimaryDropDown>
			</div>

			<ActionTitle
				queries={queries}
				idToEdit={idToEdit}
				currentId={question.id}
				currentNum={questionNum}
				defaultValue={editedItem ? editedItem.question : current?.question}
				title={
					current.question === ''
						? t('infoMessage.enterQuestion')
						: current.question
				}
				handleOnChangeField={handleOnChangeField}
			/>

			<ul className="question__list" role="menu">
				{current.options.map((option) => (
					<li
						className="question__list_option"
						role="menuitem"
						aria-label="option"
						key={option.id}
						id={option.id}
						tabIndex={0}
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
						{option.correct && idToEdit !== question.id && (
							<BsCheck2 className="icon_red icon_m" />
						)}
					</li>
				))}
				{idToEdit === question.id && question.type !== 'text' && (
					<li
						className="question__list_option p_info"
						role="menuitem"
						aria-label="option"
						onClick={handleOnAddField}
					>
						<IconBtn btnIcon={<BsPlusSquare />} />
						{t('infoMessage.addAnswer')}
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
