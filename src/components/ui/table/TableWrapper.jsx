import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { propTypesConst } from 'Constants/propTypesConst';
import { setModalState } from 'Redux/slices/modalSlice';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { getModalResponse } from 'Utils/getModalResponse';
import { setToLSByKey } from 'Utils/funcForLSByKey';
import { saveItem } from 'Utils/editingItemFunc';
import { useItemEditing } from 'Hooks/useItemEditing';
import { ErrorFallback } from '../../ErrorFallback/ErrorFallback';
import { PrimaryModal } from '../modal/PrimaryModal/PrimaryModal';

const Table = React.lazy(() => import('./Table'));

export const TableWrapper = ({
	storageName,
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
		if (edited !== null) {
			const newData = saveItem(edited, id, totalRowsState);

			setTotalRowsState(newData);
			setSubmitted(false);

			return true;
		}

		setTotalRowsState(totalRowsState);
		setSubmitted(false);
		return false;
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
		setToLSByKey(storageName, totalRowsState);
	}, [totalRowsState]);

	useEffect(() => {
		isSubmitted ? handleSaveEditing() : handleCancelEditing();
	}, [isSubmitted]);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
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
		</ErrorBoundary>
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
	current: propTypesConst.userDataItem,
};

TableWrapper.defaultProps = {
	current: undefined,
	searchResult: null,
	handleInterviewChange: () => {},
};
