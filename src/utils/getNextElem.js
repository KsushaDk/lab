export const getNextElem = (key, id) => {
	let elId = 0;

	switch (key) {
		case 'ArrowUp':
			elId = +id - 1;
			break;
		case 'ArrowDown':
			elId = +id + 1;
			break;
		default:
			elId = id;
	}

	return document.getElementById(elId.toString());
};
