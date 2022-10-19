import React from 'react';
import { PrimaryTextEditor } from 'Components/ui/editor/PrimaryTextEditor/PrimaryTextEditor';
import { CustomSelect } from 'Components/ui/select/CustomSelect/CustomSelect';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Loader } from 'Components/Loader/Loader';
import { dataTemplates } from 'Constants/constants';
import { useFetch } from 'Hooks/useFetch';
import { InterviewTemplatesItem } from './InterviewTemplatesItem';

export const InterviewTemplatesPage = () => {
	const { data, loading, error } = useFetch(
		'https://jsonplaceholder.typicode.com/todos'
	);
	return (
		<section className="content">
			{error && <h2 className="enter_error">{error}</h2>}
			{loading ? (
				<Loader />
			) : (
				<>
					<CustomSelect data={data} multi={false} />
					<CustomSelect data={data} multi />
				</>
			)}
			<PrimaryTextEditor />

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
};
