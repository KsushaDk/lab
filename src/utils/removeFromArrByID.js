export const removeFromArrByID = (data, query) =>
	data.filter((item) => item.id !== query);
