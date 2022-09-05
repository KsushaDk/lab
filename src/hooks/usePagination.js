import { useMemo } from 'react';

export const DOTS = 'dots';

export const range = (start, end) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingsCount = 3,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);
		const totalPageNumbers = siblingsCount + 5;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingsCount,
			totalPageCount
		);

		const shouldShowLeftDots = leftSiblingIndex > 3;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingsCount;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingsCount;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);

			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);

			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingsCount, currentPage]);

	return paginationRange;
};
