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

export const getQuestionToRender = (
	question,
	index,
	queries,
	handleRemoveQuestion,
	handleSaveQuestion,
	moveItem
) => ({
	[Question.Text]: (
		<TextQuestion
			question={question}
			questionNum={index + 1}
			index={index}
			queries={queries}
			moveItem={moveItem}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
			handleSaveQuestion={handleSaveQuestion}
		/>
	),
	[Question.Checkbox]: (
		<CheckboxQuestion
			question={question}
			questionNum={index + 1}
			index={index}
			queries={queries}
			moveItem={moveItem}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
			handleSaveQuestion={handleSaveQuestion}
		/>
	),
	[Question.Radio]: (
		<RadioQuestion
			question={question}
			questionNum={index + 1}
			index={index}
			queries={queries}
			moveItem={moveItem}
			key={question.id}
			handleRemoveQuestion={handleRemoveQuestion}
			handleSaveQuestion={handleSaveQuestion}
		/>
	),
	[Question.File]: null,
	[Question.Scale]: null,
	[Question.Rating]: null,
});
