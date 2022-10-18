export const checkRequeredField = (questions) =>
	questions
		.map((question) => {
			if (question.required) {
				return !!question.options.find((option) => option.checked === true);
			}
			return true;
		})
		.includes(false);
