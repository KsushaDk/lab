import { useMemo } from 'react';

export const DOTS = 'dots';

export const range = (start, end) => {
	const length = end - start + 1;

	// Create an array of certain length and set the elements within it from
	// start value to end value.

	return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingsCount = 3,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		// Calculating the total pages
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS

		const totalPageNumbers = siblingsCount + 5;

		// Total page count is less than the page pills I want to show in a paginationComponent.
		// return the range [1..totalPageCount].

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		// Calculate left and right sibling index and make sure they are within range 1 and totalPageCount

		const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingsCount,
			totalPageCount
		);

		// Do not show dots just when there is just one page number to be inserted between the extremes of
		// sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and
		// rightSiblingIndex < totalPageCount - 2

		const shouldShowLeftDots = leftSiblingIndex > 3;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		// Total page count is greater than the page pills but only the right DOTS are visible.

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingsCount;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		// Total page count is greater than the page pills but only the left DOTS are visible.
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingsCount;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);

			return [firstPageIndex, DOTS, ...rightRange];
		}

		// Total page count is greater than the page pills and both the left and the right DOTS are visible.

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);

			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingsCount, currentPage]);

	return paginationRange;
};
