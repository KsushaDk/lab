import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModalState } from 'Redux/slices/modalSlice';

export const useTable = (rows, isSubmitted, setModalSubmitted) => {
	const [totalRowsState, setTotalRowsState] = useState(rows);
	const [isEditMode, setIsEditMode] = useState(false);
	const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
	const [editedRow, setEditedRow] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		setTotalRowsState(rows);
	}, [rows]);

	const handleRemoveRow = (rowID) => {
		const newData = totalRowsState.filter((user) => user.id !== rowID);
		setTotalRowsState(newData);
	};

	const handleEdit = (rowID) => {
		setIsEditMode(true);
		setEditedRow(undefined);
		setRowIDToEdit(rowID);
	};

	const handleCancelEditing = () => {
		setIsEditMode(false);
		setEditedRow(undefined);
		setRowIDToEdit(undefined);
		setModalSubmitted(false);
	};

	const handleOnChangeField = (e) => {
		const { name: fieldName, value } = e.target;

		if (value === '') {
			dispatch(
				setModalState({
					isActive: true,
					message: 'Поле не может быть пустым',
					isSubmitted: false,
				})
			);
			handleCancelEditing();
		}

		if (fieldName === 'title') {
			const checkUniqueTitle = totalRowsState.find(
				(item) => item.title === value
			);

			if (checkUniqueTitle !== undefined) {
				dispatch(
					setModalState({
						isActive: true,
						message: 'Название опроса должно быть уникальным',
						isSubmitted: false,
					})
				);
				handleCancelEditing();
			}
		}

		setEditedRow({
			[fieldName]: value,
			...editedRow,
		});
	};

	const handleSaveEditing = () => {
		if (editedRow !== undefined) {
			const newData = totalRowsState.map((row) => {
				if (row.id === rowIDToEdit) {
					return Object.keys(row).reduce((newRow, key) => {
						if (Object.keys(editedRow).includes(key)) {
							return { ...newRow, [key]: editedRow[key] };
						}
						return { ...newRow, [key]: row[key] };
					}, {});
				}
				return row;
			});
			handleCancelEditing();
			setTotalRowsState(newData);
		} else {
			handleCancelEditing();
		}
	};

	useEffect(() => {
		if (isSubmitted) {
			handleSaveEditing();
		}
	}, [isSubmitted]);

	return {
		totalRowsState,
		isEditMode,
		rowIDToEdit,
		editedRow,
		handleOnChangeField,
		handleRemoveRow,
		handleEdit,
		handleCancelEditing,
		handleSaveEditing,
	};
};
