import React from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { dataTemplates } from 'Utils/constants';
import { InterviewTemplatesItem } from './InterviewTemplatesItem';

export const InterviewTemplatesPage = () => (
	<section className="content">
		<h2 className="title_m">Шаблоны</h2>
		<div className="content__head">
			<PrimaryBtn
				btnValue={{ value: 'Новый шаблон', link: 'create-template' }}
			/>
			<SearchForm />
		</div>
		<div className="content__cards">
			{dataTemplates.map((template) => (
				<InterviewTemplatesItem template={template} key={template.id} />
			))}
		</div>
		<h3 className="title_s total">Всего шаблонов: ...</h3>
	</section>
);
