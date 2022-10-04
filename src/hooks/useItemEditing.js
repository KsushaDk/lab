import { useState } from 'react';
import { getNotification } from 'Utils/getNotification';

export const useItemEditing = ({ removeCb, saveCb, cancelCb, changeCb }) => {
	const [idToEdit, setIdToEdit] = useState(null);
	const [editedItem, setEditedItem] = useState(null);

	const handleRemove = (id) => {
		removeCb(id);
		getNotification.success('Успешно удалено!');
	};

	const handleEdit = (id) => {
		setEditedItem(null);
		setIdToEdit(id);
	};

	const handleCancelEditing = () => {
		setEditedItem(null);
		setIdToEdit(null);
		cancelCb && cancelCb();
	};

	const handleOnChangeField = (e) => {
		const { name: fieldName, value } = e.target;

		if (value === '') {
			getNotification.failed('Упс, поле не может быть пустым');
			handleCancelEditing();
		}

		fieldName === 'title' && changeCb && changeCb(fieldName, value);

		fieldName === 'option' &&
			changeCb &&
			changeCb(fieldName, value, e.target.id);

		setEditedItem({
			[fieldName]: value,
			...editedItem,
		});
	};

	const handleSaveEditing = () => {
		editedItem === null ? handleCancelEditing() : saveCb(editedItem, idToEdit);

		setIdToEdit(null);
		getNotification.success('Успешно сохранено!');
	};

	return {
		idToEdit,
		editedItem,
		handleOnChangeField,
		handleRemove,
		handleEdit,
		handleCancelEditing,
		handleSaveEditing,
	};
};
