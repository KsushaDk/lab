import React from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { IconBtn } from '../ui/button/IconBtn/IconBtn';

export const EditDeleteActionBtns = ({
	idToEdit,
	currentId,
	handleRemove,
	handleEdit,
}) => {
	if (idToEdit === currentId) {
		return (
			<IconBtn
				handleClick={() => handleRemove(currentId)}
				btnIcon={<ImBin />}
			/>
		);
	}

	return (
		<IconBtn handleClick={() => handleEdit(currentId)} btnIcon={<ImPencil />} />
	);
};

EditDeleteActionBtns.propTypes = {
	idToEdit: PropTypes.string,
	currentId: PropTypes.string,
	handleEdit: PropTypes.func,
	handleRemove: PropTypes.func,
};

EditDeleteActionBtns.defaultProps = {
	idToEdit: null,
	currentId: null,
	handleEdit: () => {},
	handleRemove: () => {},
};
