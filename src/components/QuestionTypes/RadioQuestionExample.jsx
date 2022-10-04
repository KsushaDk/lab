import React from 'react';
import { questionRadioExample } from 'Constants/constants';
import { RadioInput } from '../ui/input/RadioInput/RadioInput';

export const RadioQuestionExample = () => (
	<div className="content__body_item example">
		<h3 className="title_xs">Пример: {questionRadioExample.question}</h3>
		<ul className="question__list" role="menu">
			{questionRadioExample.options.map((option) => (
				<li
					className="question__list_option"
					key={option.id}
					id={option.id}
					role="menuitem"
				>
					<RadioInput option={option} />
				</li>
			))}
		</ul>
	</div>
);
