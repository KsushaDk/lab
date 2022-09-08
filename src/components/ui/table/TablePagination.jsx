import React, { useEffect, useState } from 'react';
import {
	BsChevronDoubleRight,
	BsChevronDoubleLeft,
	BsChevronRight,
	BsChevronLeft,
	BsThreeDots,
} from 'react-icons/bs';
import { usePagination } from 'Hooks/usePagination';
import { TableIcon } from './TableIcon';

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
				<TableIcon
					disabled={currentPage === 1}
					handleClick={() => onPageChange(1)}
					btnIcon={<BsChevronDoubleLeft />}
				/>
				<TableIcon
					disabled={currentPage === 1}
					handleClick={() => handlePrevClick()}
					btnIcon={<BsChevronLeft />}
				/>

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

				<TableIcon
					disabled={currentPage === totalPages}
					handleClick={() => handleNextClick()}
					btnIcon={<BsChevronRight />}
				/>
				<TableIcon
					disabled={currentPage === totalPages}
					handleClick={() => onPageChange(totalPages)}
					btnIcon={<BsChevronDoubleRight />}
				/>
			</div>
		</div>
	);
};
