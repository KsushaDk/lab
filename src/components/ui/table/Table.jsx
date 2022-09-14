import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { updateUsers } from 'Redux/slices/userSlice';
import { updateInterviews } from 'Redux/slices/interviewSlice';
import { PrimaryModal } from '../modal/PrimaryModal/PrimaryModal';
import { IconBtn } from '../button/IconBtn/IconBtn';
import { TableCell } from './TableCell';
import { TablePagination } from './TablePagination';
import { TableDropMenu } from './TableDropMenu';
import './Table.scss';

export const Table = ({ columns, rows, caption, total }) => {
	const [totalRowsState, setTotalRowsState] = useState(rows);
	const [isEditMode, setIsEditMode] = useState(false);
	const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
	const [rowsState, setRowsState] = useState(totalRowsState);
	const [editedRow, setEditedRow] = useState();

	//  pagination
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	// modal
	const [modalActive, setModalActive] = useState(false);
	const [modalTitle, setModalTitle] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setTotalRowsState(rows);
	}, [rows]);

	useEffect(() => {
		if (currentPage >= rows.length / pageSize) setCurrentPage(1);
	}, [pageSize]);

	useEffect(() => {
		if (caption === 'Пользователи') {
			dispatch(updateUsers(totalRowsState));
		} else {
			dispatch(updateInterviews(totalRowsState));
		}
	}, [totalRowsState]);

	useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = totalRowsState.slice(firstPageIndex, lastPageIndex);

		setRowsState(newData);
	}, [currentPage, pageSize, totalRowsState]);

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
	};

	const handleSaveEditing = () => {
		if (editedRow !== undefined) {
			const newData = totalRowsState.map((row) => {
				if (row.id === rowIDToEdit) {
					if (editedRow.title !== undefined) {
						const checkUniqueTitle = totalRowsState.find(
							(item) => item.title === editedRow.title
						);

						if (checkUniqueTitle !== undefined) {
							setModalActive(true);
							setModalTitle('Название опроса должно быть уникальным');
							handleCancelEditing();
							return row;
						}
					}

					return Object.keys(row).reduce((newRow, key) => {
						if (Object.keys(editedRow).includes(key)) {
							return { ...newRow, [key]: editedRow[key] };
						}
						return { ...newRow, [key]: row[key] };
					}, {});
				}
				return row;
			});

			setTotalRowsState(newData);
			setIsEditMode(false);
		}

		handleCancelEditing();
	};

	const handleOnChangeField = (e) => {
		const { name: fieldName, value } = e.target;

		if (value === '') {
			setModalActive(true);
			setModalTitle('Поле не может быть пустым');
			handleCancelEditing();
		}

		setEditedRow({
			[fieldName]: value,
			...editedRow,
		});
	};

	const handleModalCancel = () => {
		setModalActive(false);
		handleCancelEditing();
	};

	const handleModalSubmit = () => {
		setModalActive(false);
		handleSaveEditing();
	};

	return (
		<>
			<PrimaryModal
				title={modalTitle}
				isActive={modalActive}
				setActive={setModalActive}
				onCancel={handleModalCancel}
				onSubmit={handleModalSubmit}
			/>

			<div className="table__wrap">
				<table className="table__content">
					<caption className="table__caption">{caption}</caption>
					<thead className="table__head">
						<tr>
							{columns.map((column) => (
								<th key={column.field} scope="col">
									{column.fieldName}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="table__body">
						{rows.length === 0 && (
							<tr>
								<td colSpan={columns.length}>
									No sush item. Try again please.
								</td>
							</tr>
						)}
						{rowsState.map((row) => (
							<tr key={row.id}>
								{Object.entries(row).map((td) => (
									<TableCell
										key={td[0]}
										isEditMode={isEditMode}
										rowIDToEdit={rowIDToEdit}
										row={row}
										td={td}
										editedRow={editedRow}
										handleOnChangeField={(e) => handleOnChangeField(e, row.id)}
									/>
								))}

								<td>
									{isEditMode && rowIDToEdit === row.id ? (
										<IconBtn
											handleClick={() => {
												setModalActive(true);
												setModalTitle(
													'Вы действительно хотите сохранить изменения?'
												);
											}}
											btnIcon={<BsCheckSquare />}
										/>
									) : (
										<IconBtn
											handleClick={() => handleEdit(row.id)}
											btnIcon={<ImPencil />}
										/>
									)}

									{isEditMode && rowIDToEdit === row.id ? (
										<IconBtn
											handleClick={() => handleCancelEditing()}
											btnIcon={<BsXSquare />}
										/>
									) : (
										<IconBtn
											handleClick={() => handleRemoveRow(row.id)}
											btnIcon={<ImBin />}
										/>
									)}

									{total.includes('опросов') && <TableDropMenu />}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="table__foot">
						<tr>
							<th scope="row" colSpan={3}>
								{total}: &nbsp; {totalRowsState.length}
							</th>
							<td colSpan={columns.length - 3}>
								<TablePagination
									totalCount={totalRowsState.length}
									pageSize={pageSize}
									changeItemsPerPage={(page) => setPageSize(page)}
									onPageChange={(page) => setCurrentPage(page)}
									currentPage={currentPage}
								/>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	);
};

Table.propTypes = {
	caption: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
			fieldName: PropTypes.string,
		})
	).isRequired,
	rows: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				id: PropTypes.string,
				username: PropTypes.string,
				email: PropTypes.string,
				password: PropTypes.string,
				role: PropTypes.string,
				registered: PropTypes.string,
				interviews: PropTypes.number,
			}),
			PropTypes.shape({
				id: PropTypes.string,
				changed: PropTypes.string,
				answers: PropTypes.number,
				title: PropTypes.string,
				link: PropTypes.string,
				results: PropTypes.string,
			}),
		])
	).isRequired,
};
