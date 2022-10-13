import React from 'react';
import PropTypes from 'prop-types';
import { BsX, BsCheck } from 'react-icons/bs';
import { getOptionToRender } from 'Constants/OptionType';
import { getOptionType } from 'Utils/getOptionType';
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
						className={
							option.correct ? 'icon_black icon_l' : 'icon_gray icon_l'
						}
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
						className="icon_black icon_l"
						onClick={(e) => handleRemove(e, option.id)}
					/>
				)}
			</>
		);
	}
	return getOptionToRender(option)[getOptionType(type)];
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
