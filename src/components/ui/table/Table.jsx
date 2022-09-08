import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { TableCell } from './TableCell';
import { TablePagination } from './TablePagination';
import { TableIcon } from './TableIcon';
import { TableDropMenu } from './TableDropMenu';
import './Table.scss';

export const Table = ({ columns, rows, caption, total }) => {
	const [totalRowsState, setTotalRowsState] = useState(rows);
	const [isEditMode, setIsEditMode] = useState(false);
	const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
	const [rowsState, setRowsState] = useState(totalRowsState);
	const [editedRow, setEditedRow] = useState();

	// //  pagination
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setTotalRowsState(rows);
	}, [rows]);

	useEffect(() => {
		if (currentPage >= rows.length / pageSize) setCurrentPage(1);
	}, [pageSize]);

	useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = totalRowsState.slice(firstPageIndex, lastPageIndex);
		setRowsState(newData);
	}, [currentPage, pageSize, totalRowsState, rows]);

	const handleEdit = (rowID) => {
		setIsEditMode(true);
		setEditedRow(undefined);
		setRowIDToEdit(rowID);
	};

	const handleRemoveRow = (rowID) => {
		const newTotalData = totalRowsState.filter((row) => row.id !== rowID);
		setTotalRowsState(newTotalData);
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

		if (editedRow !== undefined) {
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
		}

		setRowsState((prevState) => prevState);
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
				{rows.length === 0 && (
					<tr>
						<td colSpan={columns.length}>No sush item. Try again please.</td>
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
								<TableIcon
									handleClick={() => handleSaveEditing()}
									btnIcon={<BsCheckSquare />}
								/>
							) : (
								<TableIcon
									handleClick={() => handleEdit(row.id)}
									btnIcon={<ImPencil />}
								/>
							)}

							{isEditMode && rowIDToEdit === row.id ? (
								<TableIcon
									handleClick={() => handleCancelEditing()}
									btnIcon={<BsXSquare />}
								/>
							) : (
								<TableIcon
									handleClick={() => handleRemoveRow(row.id)}
									btnIcon={<ImBin />}
								/>
							)}

							{total.includes('опросов') && <TableDropMenu />}
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
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
			created: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	).isRequired,
};
