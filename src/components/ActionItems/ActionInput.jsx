import React from 'react';
import PropTypes from 'prop-types';
import { BsX, BsCheck } from 'react-icons/bs';
import { getOptionToRender } from 'Constants/OptionType';
import { infoMessage } from 'Constants/constants';
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
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && handleCorrect(option.id)}
						onClick={() => handleCorrect(option.id)}
					/>
				)}

				<SecondaryInput
					name="option"
					id={option.id}
					placeholder={
						type === 'text'
							? infoMessage.enterCorrectAnswer
							: infoMessage.enterAnswer
					}
					defaultValue={option.title}
					handleBlur={handleOnChangeField}
				/>

				{type !== 'text' && (
					<BsX
						className="icon_black icon_l"
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && handleRemove(e, option.id)}
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
