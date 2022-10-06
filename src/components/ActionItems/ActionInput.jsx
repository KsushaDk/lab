import React from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';
import { getAnswerFieldType } from 'Utils/getAnswerFieldType';
import { SecondaryInput } from '../ui/input/SecondaryInput/SecondaryInput';

export const ActionInput = ({
	idToEdit,
	currentId,
	question,
	option,
	type,
	handleRemove,
	handleOnChangeField,
}) => {
	if (idToEdit === currentId || question === null) {
		return (
			<>
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
	handleRemove: PropTypes.func,
};

ActionInput.defaultProps = {
	idToEdit: null,
	currentId: null,
	type: '',
	handleOnChangeField: () => {},
	handleRemove: () => {},
};
