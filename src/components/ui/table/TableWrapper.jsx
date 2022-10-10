import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { propTypesConst } from 'Constants/propTypesConst';
import { setModalState } from 'Redux/slices/modalSlice';
import { getModalResponse } from 'Utils/getModalResponse';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { saveItem } from 'Utils/editingItemFunc';
import { useItemEditing } from 'Hooks/useItemEditing';
import { PrimaryModal } from '../modal/PrimaryModal/PrimaryModal';
import { Table } from './Table';

export const TableWrapper = ({
	slice,
	columns,
	rows,
	caption,
	searchResult,
	total,
	handleInterviewChange,
	current,
}) => {
	const dispatch = useDispatch();

	const [totalRowsState, setTotalRowsState] = useState(rows);
	const [isSubmitted, setSubmitted] = useState(false);

	const cancelCb = () => {
		setSubmitted(false);
	};

	const removeCb = (id) => {
		const newData = removeFromArrByID(totalRowsState, id);
		setTotalRowsState(newData);
	};

	const saveCb = (edited, id) => {
		const newData = saveItem(edited, id, totalRowsState);

		setTotalRowsState(newData);
		setSubmitted(false);
	};

	const changeCb = (fieldName, value) => {
		const isFailed = handleInterviewChange(value);
		return isFailed;
	};

	const {
		idToEdit,
		editedItem,
		handleOnChangeField,
		handleRemove,
		handleEdit,
		handleCancelEditing,
		handleSaveEditing,
	} = useItemEditing({ removeCb, saveCb, cancelCb, changeCb });

	const handleModalClick = (e) => {
		const btnValue = e.target.value;
		const modalResponse = getModalResponse(btnValue);

		dispatch(
			setModalState({
				isActive: false,
				message: '',
				btnValues: [],
				isSubmitted: modalResponse,
			})
		);

		setSubmitted(modalResponse);
	};

	useEffect(() => {
		dispatch(slice(totalRowsState));
	}, [totalRowsState]);

	useEffect(() => {
		isSubmitted ? handleSaveEditing() : handleCancelEditing();
	}, [isSubmitted]);

	return (
		<>
			<PrimaryModal handleModalClick={handleModalClick} />
			<Table
				idToEdit={idToEdit}
				editedItem={editedItem}
				handleOnChangeField={handleOnChangeField}
				handleRemove={handleRemove}
				handleEdit={handleEdit}
				handleCancelEditing={handleCancelEditing}
				caption={caption}
				columns={columns}
				rows={totalRowsState}
				searchResult={searchResult}
				total={total}
				current={current}
			/>
		</>
	);
};

TableWrapper.propTypes = {
	caption: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	searchResult: PropTypes.arrayOf(propTypesConst.tableRowsItem),
	handleInterviewChange: PropTypes.func,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
			fieldName: PropTypes.string,
		})
	).isRequired,
	rows: PropTypes.arrayOf(propTypesConst.tableRowsItem).isRequired,
	current: propTypesConst.currentUser,
};

TableWrapper.defaultProps = {
	current: undefined,
	searchResult: null,
	handleInterviewChange: () => {},
};
