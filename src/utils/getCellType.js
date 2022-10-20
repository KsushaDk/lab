import { Cell } from '../constants/CellType';

export const getCellType = (cellName) => {
	let cellType = 0;

	switch (cellName) {
		case 'id':
		case 'email':
		case 'password':
		case 'password_repeat':
		case 'queries':
		case 'questions':
			cellType = Cell.Empty;
			break;

		case 'link':
		case 'results':
			cellType = Cell.Link;
			break;

		case 'role':
			cellType = Cell.Select;
			break;

		case 'username':
		case 'title':
			cellType = Cell.Input;
			break;

		default:
			cellType = Cell.Text;
	}
	return cellType;
};
