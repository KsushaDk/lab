export const getNextElemInArr = (arr, key, index) => {
	let elIndex = index;

	switch (key) {
		case 'ArrowUp':
			elIndex = +index - 1;
			break;
		case 'ArrowDown':
			elIndex = +index + 1;
			break;
		default:
			elIndex = index;
	}

	if (elIndex < 0) {
		elIndex = 0;
	}
	if (elIndex > arr.length - 1) {
		elIndex = arr.length - 1;
	}

	return document.getElementById(arr[elIndex].id);
};
