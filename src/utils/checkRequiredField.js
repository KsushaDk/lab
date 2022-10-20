export const checkRequeredField = (questions) =>
	questions
		.map((question) =>
			question.required
				? question.options.some((option) => option.checked === true)
				: true
		)
		.includes(false);
