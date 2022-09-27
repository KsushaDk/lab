export const getSearchResult = (data, query, field) => {
	if (query === '') {
		return data;
	}

	const newData = data.filter((item) =>
		item[field].toLowerCase().includes(query.toLowerCase().trim())
	);

	return newData === undefined ? [] : newData;
};
