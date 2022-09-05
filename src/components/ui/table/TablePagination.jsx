import React, { useEffect, useState } from 'react';
import {
	BsChevronDoubleRight,
	BsChevronDoubleLeft,
	BsChevronRight,
	BsChevronLeft,
	BsThreeDots,
} from 'react-icons/bs';
import { usePagination } from '../../../hooks/usePagination';

export const TablePagination = ({
	totalCount,
	changeItemsPerPage,
	pageSize,
	onPageChange,
	currentPage,
	siblingsCount = 1,
}) => {
	const [totalPages, setTotalPages] = useState(
		Math.ceil(totalCount / pageSize)
	);

	useEffect(() => {
		setTotalPages(Math.ceil(totalCount / pageSize));
	}, [pageSize]);

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingsCount,
		pageSize,
	});

	const handlePrevClick = () => {
		const changedPage = currentPage > 1 ? currentPage - 1 : currentPage;
		onPageChange(changedPage);
	};

	const handleNextClick = () => {
		onPageChange(currentPage + 1);
	};

	const handleChangePageSize = (e) => {
		changeItemsPerPage(+e.target.value);
	};

	return (
		<div className="table__pagination_wrapper">
			<form>
				<select
					className="select-perpage"
					defaultValue={pageSize}
					onChange={(e) => handleChangePageSize(e)}
				>
					<option value="1">1</option>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
				</select>
			</form>
			<div className="table__pagination">
				<button
					className="table_icon"
					type="button"
					onClick={() => onPageChange(1)}
					disabled={totalCount <= pageSize}
				>
					<BsChevronDoubleLeft />
				</button>
				<button
					className="table_icon"
					type="button"
					onClick={() => handlePrevClick()}
					disabled={currentPage === 1}
				>
					<BsChevronLeft />
				</button>

				{paginationRange.map((pageNumber) => {
					if (pageNumber === 'dots') {
						return (
							<button className="table_icon" type="button" disabled>
								<BsThreeDots />
							</button>
						);
					}

					return (
						<button
							key={pageNumber}
							className={
								currentPage === pageNumber
									? 'table_icon active_page'
									: 'table_icon'
							}
							onClick={() => onPageChange(pageNumber)}
							disabled={totalCount <= pageSize}
							type="button"
						>
							{pageNumber}
						</button>
					);
				})}

				<button
					className="table_icon"
					type="button"
					onClick={() => handleNextClick()}
					disabled={currentPage === totalPages}
				>
					<BsChevronRight />
				</button>
				<button
					className="table_icon"
					type="button"
					onClick={() => onPageChange(totalPages)}
					disabled={totalCount <= pageSize}
				>
					<BsChevronDoubleRight />
				</button>
			</div>
		</div>
	);
};
