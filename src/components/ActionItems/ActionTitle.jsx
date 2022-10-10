import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SecondaryInput } from '../ui/input/SecondaryInput/SecondaryInput';

export const ActionTitle = ({
	queries,
	idToEdit,
	currentId,
	currentNum,
	defaultValue,
	title,
	handleOnChangeField,
}) => {
	const [showNumber, setShowNumber] = useState(false);

	useEffect(() => {
		queries.forEach((query) => {
			if (query.checked === true && query.title === 'Номера вопросов') {
				setShowNumber(true);
			}
		});
		return () => setShowNumber(false);
	}, [queries]);

	if (idToEdit === currentId) {
		return (
			<SecondaryInput
				name="question"
				id={currentId}
				placeholder="Введите вопрос..."
				defaultValue={defaultValue}
				handleBlur={handleOnChangeField}
			/>
		);
	}
	return (
		<h3 className="title_xs">
			{showNumber && `${currentNum}.`}&nbsp;{title}
		</h3>
	);
};

ActionTitle.propTypes = {
	idToEdit: PropTypes.string,
	currentId: PropTypes.string,
	currentNum: PropTypes.number,
	defaultValue: PropTypes.string,
	title: PropTypes.string,
	handleOnChangeField: PropTypes.func,
};

ActionTitle.defaultProps = {
	idToEdit: null,
	currentId: null,
	currentNum: 0,
	defaultValue: '',
	title: '',
	handleOnChangeField: () => {},
};
