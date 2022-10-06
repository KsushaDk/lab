import { v4 as uuidv4 } from 'uuid';

export const addDefaultValue = {
	interview: () => ({
		id: uuidv4(),
		name: '',
		questions: [],
	}),
	question: (id, type) => ({
		id,
		type,
		question: '',
		options: [],
	}),
	option: () => ({
		id: uuidv4(),
		title: '',
		checked: false,
		correct: false,
	}),
};
