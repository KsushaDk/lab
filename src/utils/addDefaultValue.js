import { v4 as uuidv4 } from 'uuid';

export const addDefaultValue = {
	interview: () => ({
		id: uuidv4(),
		name: '',
		questions: [],
		queries: [],
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
		checked: type === 'text',
		correct: type === 'text',
	}),
};
