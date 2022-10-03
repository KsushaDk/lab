export const saveItem = (item, id, data) => {
	const newData = data.map((row) => {
		if (row.id === id) {
			return Object.keys(row).reduce((newRow, key) => {
				if (Object.keys(item).includes(key)) {
					return { ...newRow, [key]: item[key] };
				}
				return { ...newRow, [key]: row[key] };
			}, {});
		}
		return row;
	});
	return newData;
};
