import { Question } from '../constants/QuestionType';

export const getQuestionType = (questionName) => {
	let questionType = 0;

	switch (questionName) {
		case 'text':
			questionType = Question.Text;
			break;

		case 'checkbox':
			questionType = Question.Checkbox;
			break;

		case 'radio':
			questionType = Question.Radio;
			break;

		case 'file':
			questionType = Question.File;
			break;
		case 'scale':
			questionType = Question.Scale;
			break;

		case 'rating':
			questionType = Question.Rating;
			break;

		default:
			questionType = Question.Checkbox;
	}
	return questionType;
};
