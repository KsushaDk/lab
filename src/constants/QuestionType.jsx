import React from 'react';
import { TextQuestion } from 'Components/QuestionTypes/TextQuestion';
import { CheckboxQuestion } from 'Components/QuestionTypes/CheckboxQuestion';
import { RadioQuestion } from 'Components/QuestionTypes/RadioQuestion';

export const Question = Object.freeze({
	Text: 1,
	Checkbox: 2,
	Radio: 3,
	File: 4,
	Scale: 5,
	Rating: 6,
});

export const getQuestionToRender = (question, handleRemoveQuestion) => ({
	[Question.Text]: (
		<TextQuestion
			questionId={question.id}
			questionType={question.type}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
		/>
	),
	[Question.Checkbox]: (
		<CheckboxQuestion
			questionId={question.id}
			questionType={question.type}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
		/>
	),
	[Question.Radio]: (
		<RadioQuestion
			questionId={question.id}
			questionType={question.type}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
		/>
	),
	[Question.File]: null,
	[Question.Scale]: null,
	[Question.Rating]: null,
});
