import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../Loader/Loader';
import { TablePagination } from './TablePagination';
import { TableRow } from './TableRow';
import './Table.scss';

export const Table = ({
	idToEdit,
	editedItem,
	handleOnChangeField,
	handleRemove,
	handleEdit,
	handleCancelEditing,
	columns,
	rows,
	searchResult,
	caption,
	total,
	current,
}) => {
	const [rowsToDisplay, setRowsToDisplay] = useState(null);

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
			setRowsToDisplay(rows.slice(firstPageIndex, lastPageIndex));
		}
	}, [currentPage, pageSize, rows, searchResult]);

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
								editedItem={editedItem}
								idToEdit={idToEdit}
								handleOnChangeField={handleOnChangeField}
								handleEdit={handleEdit}
								handleCancelEditing={handleCancelEditing}
								handleRemove={handleRemove}
							/>
						))}
					</tbody>
					<tfoot className="table__foot">
						<tr>
							<th scope="row" colSpan={3}>
								{total}: &nbsp; {rows.length}
							</th>
							<td colSpan={columns.length - 3}>
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
			) : (
				<Loader />
			)}
		</div>
	);
};

Table.propTypes = {
	caption: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	searchResult: PropTypes.string,
	handleCancelEditing: PropTypes.func.isRequired,
	handleOnChangeField: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
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
	idToEdit: PropTypes.string.isRequired,
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
	searchResult: null,
};
