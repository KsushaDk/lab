export const getSearchResult = (data, search, field) => {
	if (search.trim() === '') {
		return data;
	}

	const newData = data.filter((item) =>
		item[field].toLowerCase().includes(search.toLowerCase().trim())
	);

	return newData === undefined ? [] : newData;
};
