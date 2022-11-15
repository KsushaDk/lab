import React from 'react';
import { useTranslation } from 'react-i18next';
import { questionCheckboxExample } from 'Constants/constants';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';

const CheckboxQuestionExample = () => {
	const { t } = useTranslation();

	return (
		<div className="content__body_item example">
			<h3 className="title_xs">
				{t('infoMessage.example')}: {questionCheckboxExample.question}
			</h3>
			<ul className="question__list" role="menu">
				{questionCheckboxExample.options.map((option) => (
					<li
						className="question__list_option"
						key={option.id}
						id={option.id}
						role="menuitem"
						aria-label="option"
					>
						<CheckboxInput option={option} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default CheckboxQuestionExample;
