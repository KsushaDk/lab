import React from 'react';
import PropTypes from 'prop-types';
import { BsX, BsCheck } from 'react-icons/bs';
import { getAnswerFieldType } from 'Utils/getAnswerFieldType';
import { SecondaryInput } from '../ui/input/SecondaryInput/SecondaryInput';

export const ActionInput = ({
	idToEdit,
	currentId,
	question,
	option,
	type,
	handleRemove,
	handleCorrect,
	handleOnChangeField,
}) => {
	if (idToEdit === currentId || question === null) {
		return (
			<>
				{type !== 'text' && (
					<BsCheck
						className={option.correct ? 'icon_black' : 'icon_gray'}
						onClick={() => handleCorrect(option.id)}
					/>
				)}

				<SecondaryInput
					name="option"
					id={option.id}
					placeholder={
						type === 'text'
							? 'Введите правильный ответ...'
							: 'Введите вариант ответа...'
					}
					defaultValue={option.title}
					handleBlur={handleOnChangeField}
				/>

				{type !== 'text' && (
					<BsX
						className="icon_black"
						onClick={(e) => handleRemove(e, option.id)}
					/>
				)}
			</>
		);
	}
	return getAnswerFieldType(type, option);
};

ActionInput.propTypes = {
	idToEdit: PropTypes.string,
	currentId: PropTypes.string,
	type: PropTypes.string,
	handleOnChangeField: PropTypes.func,
	handleCorrect: PropTypes.func,
	handleRemove: PropTypes.func,
};

ActionInput.defaultProps = {
	idToEdit: null,
	currentId: null,
	type: '',
	handleOnChangeField: () => {},
	handleCorrect: () => {},
	handleRemove: () => {},
};
