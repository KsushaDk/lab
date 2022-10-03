import { getCellType } from 'Utils/getCellType';
import { getСellToRender } from 'Constants/CellType';

export const TableCell = ({
	idToEdit,
	editedItem,
	row,
	td,
	handleOnChangeField,
}) => {
	const content = {
		key: td[0],
		value: td[1],
		handleOnChangeField,
		idToEdit,
		editedItem,
		row,
	};

	const cellType = getCellType(td[0]);

	const el = getСellToRender(content)[cellType];

	return el;
};
