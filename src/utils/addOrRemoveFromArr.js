export const addOrRemoveFromArr = (selected, arr, data, id) => {
	if (selected.includes(id)) {
		return arr.filter((item) => item.id !== id);
	}

	const newItem = data.find((item) => item.id === id);
	return [...arr, newItem];
};
