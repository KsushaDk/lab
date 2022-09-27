export const removeItemByQuery = (data, query) =>
	data.filter((item) => +item.id !== +query);
