export const setToLSByKey = (key, data) =>
	localStorage.setItem(key, JSON.stringify(data));

export const getFromLSByKey = (key) => JSON.parse(localStorage.getItem(key));
