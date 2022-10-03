export const findInArrByID = (data, id) =>
	data.find((item) => item.id.toString() === id.toString());
