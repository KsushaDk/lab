import React from 'react';
import { questionTextExample } from 'Constants/constants';
import { PrimaryOutput } from '../ui/output/PrimaryOutput/PrimaryOutput';

export const TextQuestionExample = () => (
	<div className="content__body_item example">
		<h3 className="title_xs">Пример: {questionTextExample.question}</h3>
		<PrimaryOutput option={questionTextExample.options[0]} />
	</div>
);
