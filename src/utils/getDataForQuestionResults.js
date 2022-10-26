export const getDataForQuestionResults = (interview, question) => {
	const qcurrentQuestions = interview.allQuestions.filter(
		(item) => item.id === question.id
	);
	const qcurrentOptions = qcurrentQuestions
		.map((q) => q.options)
		.flat(Infinity);

	const selectedOptions = {};

	qcurrentOptions.forEach((option) => {
		if (option.checked) {
			selectedOptions[option.title]
				? (selectedOptions[option.title] += 1)
				: (selectedOptions[option.title] = 1);
		} else if (!option.checked) {
			selectedOptions[option.title]
				? selectedOptions[option.title]
				: (selectedOptions[option.title] = 0);
		}
	});

	const optionsData = Object.values(selectedOptions).map((num) =>
		Math.floor((num * 100) / interview.total).toString()
	);

	return { optionsData, selectedOptions };
};
