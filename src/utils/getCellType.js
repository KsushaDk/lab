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
		case 'correct':
		case 'checked':
		case 'answer':
		case 'isAuth':
		case 'author':
			cellType = Cell.Empty;
			break;

		case 'link':
		case 'results':
		case 'userId':
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
