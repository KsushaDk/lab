import { getCellType } from 'Utils/getCellType';
import { getСellToRender } from 'Utils/CellType';

export const TableCell = ({
	isEditMode,
	rowIDToEdit,
	editedRow,
	row,
	td,
	handleOnChangeField,
}) => {
	const content = {
		key: td[0],
		value: td[1],
		handleOnChangeField,
		isEditMode,
		rowIDToEdit,
		editedRow,
		row,
	};

	const cellType = getCellType(td[0]);

	const el = getСellToRender(content)[cellType];

	return el;
};
