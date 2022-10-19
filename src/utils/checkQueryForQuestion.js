export const checkQueryForQuestion = (queries, key) => {
	const checkQuery = queries.find(
		(query) => query.key === key && query.checked === true
	);

	if (checkQuery) {
		return true;
	}

	return false;
};
