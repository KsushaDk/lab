import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getNotification } from 'Utils/getNotification';

export const useItemEditing = ({ removeCb, saveCb, cancelCb, changeCb }) => {
	const [idToEdit, setIdToEdit] = useState(null);
	const [editedItem, setEditedItem] = useState(null);

	const { t } = useTranslation();

	const handleRemove = (id) => {
		removeCb(id);
		getNotification.success(t('infoMessage.deleteSuccess'));
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

		switch (true) {
			case value.trim() === '':
				getNotification.failed(t('infoMessage.notEmptyField'));
				handleCancelEditing();
				break;

			case fieldName === 'title':
				!changeCb(fieldName, value.trim())
					? handleCancelEditing()
					: setEditedItem({
							[fieldName]: value.trim(),
							...editedItem,
					  });
				break;

			case fieldName === 'option':
				changeCb && changeCb(fieldName, value.trim(), e.target.id);
				break;

			default:
				setEditedItem({
					[fieldName]: value.trim(),
					...editedItem,
				});
		}
	};

	const handleSaveEditing = () => {
		const success = saveCb(editedItem, idToEdit);

		if (success) {
			setIdToEdit(null);
			getNotification.success(t('infoMessage.saveSuccess'));
		}
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
