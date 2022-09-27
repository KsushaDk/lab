import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'Hooks/useTable';
import { Loader } from '../../Loader/Loader';
import { TablePagination } from './TablePagination';
import './Table.scss';
import { TableRow } from './TableRow';

export const Table = ({
	columns,
	rows,
	searchResult,
	caption,
	total,
	updateData,
	isSubmitted,
	setModalSubmitted,
	current,
}) => {
	const {
		totalRowsState,
		isEditMode,
		editedRow,
		rowIDToEdit,
		handleOnChangeField,
		handleRemoveRow,
		handleEdit,
		handleCancelEditing,
	} = useTable(rows, isSubmitted, setModalSubmitted);

	const [rowsToDisplay, setRowsToDisplay] = useState(totalRowsState);

	//  pagination
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (currentPage >= rows.length / pageSize) setCurrentPage(1);
	}, [pageSize]);

	useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;

		searchResult?.length !== 0
			? setRowsToDisplay(searchResult?.slice(firstPageIndex, lastPageIndex))
			: setRowsToDisplay([]);

		if (searchResult === null) {
			setRowsToDisplay(totalRowsState.slice(firstPageIndex, lastPageIndex));
		}
	}, [currentPage, pageSize, totalRowsState, rows, searchResult]);

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
						{rowsToDisplay.length === 0 && (
							<tr>
								<td colSpan={columns.length}>
									No sush item. Try again please.
								</td>
							</tr>
						)}
						{rowsToDisplay.map((row) => (
							<TableRow
								key={row.id}
								total={total}
								current={current}
								row={row}
								editedRow={editedRow}
								rowIDToEdit={rowIDToEdit}
								isEditMode={isEditMode}
								handleOnChangeField={handleOnChangeField}
								handleEdit={handleEdit}
								handleCancelEditing={handleCancelEditing}
								handleRemoveRow={handleRemoveRow}
							/>
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
	setModalSubmitted: PropTypes.func.isRequired,
	current: PropTypes.shape({
		id: PropTypes.string,
		username: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		role: PropTypes.string,
		registered: PropTypes.string,
		interviews: PropTypes.number,
	}),
};

Table.defaultProps = {
	current: undefined,
};
