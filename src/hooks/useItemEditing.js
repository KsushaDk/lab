import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotification, failedNotification } from 'Constants/constants';

export const useItemEditing = ({ removeCb, saveCb, cancelCb, changeCb }) => {
	const [idToEdit, setIdToEdit] = useState(null);
	const [editedItem, setEditedItem] = useState(null);

	const failed = (message) => toast.error(message, failedNotification);
	const success = (message) => toast.success(message, successNotification);

	const handleRemove = (id) => {
		removeCb(id);
		success('Успешно удалено!');
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
			failed('Упс, поле не может быть пустым');
			handleCancelEditing();
		}

		(fieldName === 'title' || fieldName === 'option') &&
			changeCb &&
			changeCb(fieldName, value);

		setEditedItem({
			[fieldName]: value,
			...editedItem,
		});
	};

	const handleSaveEditing = () => {
		editedItem === null ? handleCancelEditing() : saveCb(editedItem, idToEdit);

		setIdToEdit(null);
		success('Успешно сохранено!');
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
