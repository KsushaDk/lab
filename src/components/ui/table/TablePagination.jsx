import React, { useEffect, useState } from 'react';
import {
	BsChevronDoubleRight,
	BsChevronDoubleLeft,
	BsChevronRight,
	BsChevronLeft,
	BsThreeDots,
} from 'react-icons/bs';
import { usePagination } from 'Hooks/usePagination';
import { IconBtn } from '../button/IconBtn/IconBtn';
import { PrimarySelect } from '../select/PrimarySelect/PrimarySelect';

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
			<PrimarySelect
				name="role"
				options={['1', '5', '10', '20']}
				defaultValue={pageSize}
				hangleSelectChange={(e) => handleChangePageSize(e)}
			/>
			<div className="table__pagination_range">
				<IconBtn
					disabled={currentPage === 1}
					handleClick={() => onPageChange(1)}
					btnIcon={<BsChevronDoubleLeft />}
				/>
				<IconBtn
					disabled={currentPage === 1}
					handleClick={() => handlePrevClick()}
					btnIcon={<BsChevronLeft />}
				/>

				{paginationRange.map((pageNumber) => {
					if (pageNumber === 'dots') {
						return <IconBtn btnIcon={<BsThreeDots />} />;
					}

					return (
						<button
							key={pageNumber}
							className={
								currentPage === pageNumber ? 'page_num active_page' : 'page_num'
							}
							onClick={() => onPageChange(pageNumber)}
							disabled={totalCount <= pageSize}
							type="button"
						>
							{pageNumber}
						</button>
					);
				})}

				<IconBtn
					disabled={currentPage === totalPages}
					handleClick={() => handleNextClick()}
					btnIcon={<BsChevronRight />}
				/>
				<IconBtn
					disabled={currentPage === totalPages}
					handleClick={() => onPageChange(totalPages)}
					btnIcon={<BsChevronDoubleRight />}
				/>
			</div>
		</div>
	);
};
