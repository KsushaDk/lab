import React from 'react';
import { useTranslation } from 'react-i18next';
import { questionTextExample } from 'Constants/constants';
import { PrimaryOutput } from '../ui/output/PrimaryOutput/PrimaryOutput';

const TextQuestionExample = () => {
	const { t } = useTranslation();

	return (
		<div className="content__body_item example">
			<h3 className="title_xs">
				{t('infoMessage.example')}: {questionTextExample.question}
			</h3>
			<PrimaryOutput option={questionTextExample.options[0]} />
		</div>
	);
};

export default TextQuestionExample;
