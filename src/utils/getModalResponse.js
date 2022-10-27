export const getModalResponse = (btnValue) => {
	let modalSubmit = false;

	switch (btnValue) {
		case 'Сохранить':
		case 'Ок':
		case 'Ok':
		case 'Save':
			modalSubmit = true;
			break;

		case 'Отмена':
		case 'Cancel':
			modalSubmit = false;
			break;

		default:
			modalSubmit = false;
	}

	return modalSubmit;
};
