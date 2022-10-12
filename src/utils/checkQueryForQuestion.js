export const checkQueryForQuestion = (queries, title) => {
	const checkQuery = queries.find(
		(query) => query.title === title && query.checked === true
	);

	if (checkQuery) {
		return true;
	}

	return false;
};
