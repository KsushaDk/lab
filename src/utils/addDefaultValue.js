import { v4 as uuidv4 } from 'uuid';

export const addDefaultValue = {
	interview: () => ({
		id: uuidv4(),
		title: '',
		questions: [],
		queries: {
			anonymousInterview: false,
			questionNum: false,
			pageNum: false,
			randomQuestionOrder: false,
			requiredFields: false,
			progressBar: false,
		},
		changed: '',
		answers: 0,
		link: '',
		results: 'результаты',
	}),
	question: (type) => ({
		id: uuidv4(),
		type,
		question: '',
		options: [],
		required: false,
	}),
	option: (type) => ({
		id: uuidv4(),
		title: '',
		checked: false,
		correct: type === 'text',
	}),
};
