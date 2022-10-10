import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { propTypesConst } from 'Constants/propTypesConst';
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
	searchResult: PropTypes.arrayOf(propTypesConst.tableRowsItem),
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
	rows: PropTypes.arrayOf(propTypesConst.tableRowsItem).isRequired,
	idToEdit: PropTypes.string,
	current: propTypesConst.currentUser,
};

Table.defaultProps = {
	current: undefined,
	searchResult: null,
	idToEdit: null,
};
