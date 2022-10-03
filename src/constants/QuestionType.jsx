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

export const getQuestionToRender = (questionCheckbox) => ({
	[Question.Text]: <TextQuestion />,
	[Question.Checkbox]: <CheckboxQuestion questionId={questionCheckbox.id} />,
	[Question.Radio]: <RadioQuestion />,
	[Question.File]: null,
	[Question.Scale]: null,
	[Question.Rating]: null,
});
