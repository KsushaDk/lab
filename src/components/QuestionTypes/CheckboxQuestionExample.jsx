import React from 'react';
import { questionCheckboxExample } from 'Constants/constants';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';

export const CheckboxQuestionExample = () => (
	<div className="content__body_item example">
		<h3 className="title_xs">Пример: {questionCheckboxExample.question}</h3>
		<ul className="question__list" role="menu">
			{questionCheckboxExample.options.map((option) => (
				<li
					className="question__list_option"
					key={option.id}
					id={option.id}
					role="menuitem"
				>
					<CheckboxInput option={option} />
				</li>
			))}
		</ul>
	</div>
);
