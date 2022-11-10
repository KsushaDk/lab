export const getDataForQuestionResults = (interview, question) => {
	const currentQuestions = interview.allQuestions.filter(
		(item) => item.id === question.id
	);

	const currentOptions = currentQuestions
		.map((item) =>
			item.options.map((option) => ({ ...option, userId: item.userId }))
		)
		.flat(Infinity);

	const selectedOptions = {};
	const optionsColor = {};

	currentOptions.forEach((option) => {
		if (option.checked) {
			optionsColor[option.title] = '#eb3d26';
			selectedOptions[option.title]
				? (selectedOptions[option.title] += 1)
				: (selectedOptions[option.title] = 1);
		} else if (!option.checked) {
			optionsColor[option.title] = '#cac6c5';
			selectedOptions[option.title]
				? selectedOptions[option.title]
				: (selectedOptions[option.title] = 0);
		}
	});

	const optionsData = Object.values(selectedOptions).map((num) =>
		Math.floor((num * 100) / interview.total).toString()
	);

	return { optionsData, selectedOptions, optionsColor };
};
