import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsCaretDownFill, BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { Td } from './Td';
import { TablePagination } from './TablePagination';
import './Table.scss';

export const Table = ({ columns, rows, caption, total }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
	const [rowsState, setRowsState] = useState(rows);
	const [editedRow, setEditedRow] = useState();

	//  pagination
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (currentPage >= rows.length / pageSize) setCurrentPage(1);
	}, [pageSize]);

	useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = rows.slice(firstPageIndex, lastPageIndex);
		setRowsState(newData);
	}, [currentPage, pageSize]);

	const handleEdit = (rowID) => {
		setIsEditMode(true);
		setEditedRow(undefined);
		setRowIDToEdit(rowID);
	};

	const handleRemoveRow = (rowID) => {
		const newData = rowsState.filter((row) => row.id !== rowID);
		setRowsState(newData);
	};

	const handleOnChangeField = (e, rowID) => {
		const { name: fieldName, value } = e.target;

		setEditedRow({
			id: rowID,
			[fieldName]: value,
			...editedRow,
		});
	};

	const handleCancelEditing = () => {
		setIsEditMode(false);
		setEditedRow(undefined);
	};

	const handleSaveEditing = () => {
		setIsEditMode(false);

		const changedKeys = Object.keys(editedRow);

		const newData = rowsState.map((row) => {
			if (row.id === editedRow.id) {
				changedKeys.forEach((key) => {
					row[key] = editedRow[key];
				});
			}
			return row;
		});

		setRowsState(newData);
		setEditedRow(undefined);
	};

	return (
		<table className="table__content">
			<caption>{caption}</caption>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column.field} scope="col">
							{column.fieldName}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rowsState.map((row) => (
					<tr key={row.id}>
						{Object.entries(row).map((td) => (
							<Td
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
								<button
									className="table_icon"
									onClick={() => handleSaveEditing()}
									type="button"
								>
									<BsCheckSquare />
								</button>
							) : (
								<button
									className="table_icon"
									onClick={() => handleEdit(row.id)}
									type="button"
								>
									<ImPencil />
								</button>
							)}

							{isEditMode && rowIDToEdit === row.id ? (
								<button
									className="table_icon"
									onClick={() => handleCancelEditing()}
									type="button"
								>
									<BsXSquare />
								</button>
							) : (
								<button
									className="table_icon"
									onClick={() => handleRemoveRow(row.id)}
									type="button"
								>
									<ImBin />
								</button>
							)}
							<button className="table_icon" type="button">
								<BsCaretDownFill />
							</button>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th scope="row" colSpan={3}>
						{total}: &nbsp; {rows.length}
					</th>
					<td colSpan={(columns.length - 3).toString()}>
						<TablePagination
							totalCount={rows.length}
							pageSize={pageSize}
							changeItemsPerPage={(page) => setPageSize(page)}
							onPageChange={(page) => setCurrentPage(page)}
							currentPage={currentPage}
						/>
					</td>
				</tr>
			</tfoot>
		</table>
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
		PropTypes.shape({
			name: PropTypes.string,
			role: PropTypes.string,
			date: PropTypes.string,
			interviews: PropTypes.number,
		})
	).isRequired,
};
