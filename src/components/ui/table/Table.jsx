import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setModalState } from 'Redux/slices/modalSlice';
import { useTable } from 'Hooks/useTable';
import { Loader } from '../../Loader/Loader';
import { IconBtn } from '../button/IconBtn/IconBtn';
import { TableCell } from './TableCell';
import { TablePagination } from './TablePagination';
import { TableDropMenu } from './TableDropMenu';
import './Table.scss';

export const Table = ({
	columns,
	rows,
	caption,
	total,
	updateData,
	isSubmitted,
}) => {
	const dispatch = useDispatch();

	const {
		totalRowsState,
		isEditMode,
		editedRow,
		rowIDToEdit,
		handleOnChangeField,
		handleRemoveRow,
		handleEdit,
		handleCancelEditing,
	} = useTable(rows, isSubmitted);

	const [rowsToDisplay, setRowsToDisplay] = useState(totalRowsState);

	// //  pagination
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (currentPage >= rows.length / pageSize) setCurrentPage(1);
	}, [pageSize]);

	useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = totalRowsState.slice(firstPageIndex, lastPageIndex);

		setRowsToDisplay(newData);
	}, [currentPage, pageSize, totalRowsState]);

	useEffect(() => {
		updateData(totalRowsState);
	}, [totalRowsState]);

	return (
		<div className="table__wrap">
			{rowsToDisplay ? (
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
						{rowsToDisplay.map((row) => (
							<tr key={row.id}>
								{Object.entries(row).map((td) => (
									<TableCell
										key={td[0]}
										isEditMode={isEditMode}
										rowIDToEdit={rowIDToEdit}
										row={row}
										td={td}
										editedRow={editedRow}
										handleOnChangeField={(e) => handleOnChangeField(e)}
									/>
								))}

								<td>
									{isEditMode && rowIDToEdit === row.id ? (
										<IconBtn
											handleClick={() => {
												dispatch(
													setModalState({
														isActive: true,
														message:
															'Вы действительно хотите сохранить изменения?',
														isSubmitted: false,
													})
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
			) : (
				<Loader />
			)}
		</div>
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
	updateData: PropTypes.func.isRequired,
	isSubmitted: PropTypes.bool.isRequired,
};
