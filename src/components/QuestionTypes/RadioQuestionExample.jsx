import React from 'react';
import { useTranslation } from 'react-i18next';
import { questionRadioExample } from 'Constants/constants';
import { RadioInput } from '../ui/input/RadioInput/RadioInput';

const RadioQuestionExample = () => {
	const { t } = useTranslation();

	return (
		<div className="content__body_item example">
			<h3 className="title_xs">
				{t('infoMessage.example')}: {questionRadioExample.question}
			</h3>
			<ul className="question__list" role="menu">
				{questionRadioExample.options.map((option) => (
					<li
						className="question__list_option"
						key={option.id}
						id={option.id}
						role="menuitem"
						aria-label="option"
					>
						<RadioInput option={option} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default RadioQuestionExample;
