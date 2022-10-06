export const toggleValueByKey = (data, id, keys) => {
	const newData = data.map((item) => {
		if (item.id.toString() === id.toString()) {
			Array.isArray(keys)
				? keys.forEach((k) => {
						item[k] = !item[k];
				  })
				: (item[keys] = !item[keys]);
		}
		return item;
	});

	return newData;
};
