export const getModalResponse = (btnValue) => {
	let modalSubmit = false;

	switch (btnValue) {
		case 'Сохранить':
		case 'Ок':
			modalSubmit = true;
			break;

		case 'Отмена':
			modalSubmit = false;
			break;

		default:
			modalSubmit = false;
	}

	return modalSubmit;
};
