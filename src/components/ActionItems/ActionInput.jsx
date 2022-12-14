import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsX, BsCheck } from 'react-icons/bs';
import { getOptionToRender } from 'Constants/OptionType';
import { getOptionType } from 'Utils/getOptionType';

const SecondaryInput = React.lazy(() =>
	import('../ui/input/SecondaryInput/SecondaryInput')
);

const ActionInput = ({
	idToEdit,
	currentId,
	question,
	option,
	type,
	handleRemove,
	handleCorrect,
	handleOnChangeField,
}) => {
	const { t } = useTranslation();

	const handleOnkeyDown = useCallback((e) => {
		e.key === 'Enter' && handleCorrect(option.id);
	});

	const handleOnClick = useCallback(() => handleCorrect(option.id));

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
						onKeyDown={handleOnkeyDown}
						onClick={handleOnClick}
					/>
				)}

				<SecondaryInput
					name="option"
					id={option.id}
					placeholder={
						type === 'text'
							? t('infoMessage.enterCorrectAnswer')
							: t('infoMessage.enterAnswer')
					}
					defaultValue={type === 'text' ? option.answer : option.title}
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

export default ActionInput;
