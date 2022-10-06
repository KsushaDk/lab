import React from 'react';
import PropTypes from 'prop-types';
import { SecondaryBtn } from '../ui/button/SecondaryBtn/SecondaryBtn';

export const SaveCancelActionBtns = ({
	handleSaveEditing,
	handleCancelEditing,
}) => (
	<>
		<SecondaryBtn btnValue="Сохранить" handleClick={handleSaveEditing} />
		<SecondaryBtn btnValue="Отмена" handleClick={handleCancelEditing} />
	</>
);

SaveCancelActionBtns.propTypes = {
	handleSaveEditing: PropTypes.func,
	handleCancelEditing: PropTypes.func,
};

SaveCancelActionBtns.defaultProps = {
	handleSaveEditing: () => {},
	handleCancelEditing: () => {},
};
