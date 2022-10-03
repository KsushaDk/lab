export const toggleValueByKey = (data, id, key) => {
	const newData = data.map((item) => {
		if (item.id.toString() === id.toString()) {
			item[key] = !item[key];
		}
		return item;
	});

	return newData;
};
