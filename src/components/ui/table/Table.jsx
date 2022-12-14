import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { propTypesConst } from 'Constants/propTypesConst';
import './Table.scss';

const TablePagination = React.lazy(() => import('./TablePagination'));
const TableRow = React.lazy(() => import('./TableRow'));

const Table = ({
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

	const { t } = useTranslation();

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
			{rowsToDisplay && (
				<table className="table__content">
					{caption && <caption className="table__caption">{caption}</caption>}
					<thead className="table__head">
						<tr>
							{columns.map((column) => (
								<th key={column.key} scope="col">
									{t(`tableColumns.${column.key}`)}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="table__body">
						{rowsToDisplay.length === 0 && (
							<tr>
								<td colSpan={columns.length}>
									{t('infoMessage.noSearchResult')}
								</td>
							</tr>
						)}
						{rowsToDisplay.map((row) => (
							<TableRow
								key={row.userId ? row.title : row.id}
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
							<th scope="row">
								{total}: &nbsp; {rows.length}
							</th>
							<td colSpan={columns.length - 1}>
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
			)}
		</div>
	);
};

Table.propTypes = {
	caption: PropTypes.string,
	total: PropTypes.string,
	searchResult: PropTypes.arrayOf(propTypesConst.tableRowsItem),
	handleCancelEditing: PropTypes.func,
	handleOnChangeField: PropTypes.func,
	handleRemove: PropTypes.func,
	handleEdit: PropTypes.func,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
		})
	).isRequired,
	rows: PropTypes.arrayOf(propTypesConst.tableRowsItem).isRequired,
	idToEdit: PropTypes.string,
	current: propTypesConst.userDataItem,
};

Table.defaultProps = {
	current: undefined,
	searchResult: null,
	idToEdit: null,
	caption: null,
	total: null,
	handleCancelEditing: () => {},
	handleOnChangeField: () => {},
	handleRemove: () => {},
	handleEdit: () => {},
};

export default Table;
