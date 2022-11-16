import React from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryTextEditor } from 'Components/ui/editor/PrimaryTextEditor/PrimaryTextEditor';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { dataTemplates } from 'Constants/constants';
import { useFetch } from 'Hooks/useFetch';
import { InterviewTemplatesItem } from './InterviewTemplatesItem';

const CustomSelect = React.lazy(() =>
	import('Components/ui/select/CustomSelect/CustomSelect')
);
const SearchForm = React.lazy(() =>
	import('Components/ui/form/SearchForm/SearchForm')
);

const InterviewTemplatesPage = () => {
	const { data, error } = useFetch(
		'https://jsonplaceholder.typicode.com/todos'
	);

	const { t } = useTranslation();
	return (
		<section className="content">
			{error && <h2 className="enter_error">{error}</h2>}
			<h2 className="enter_error" style={{ color: '#eb3d26' }}>
				TEST PAGE
			</h2>
			<CustomSelect data={data} multi={false} />
			<CustomSelect data={data} multi />

			<PrimaryTextEditor />

			<h2 className="title_m">{t('interviewTemplates.title')}</h2>
			<div className="content__head">
				<PrimaryBtn
					btnValue={{
						key: 'createTemplate',
						link: 'create-template',
					}}
				/>
				<SearchForm />
			</div>
			<div className="content__cards">
				{dataTemplates.map((template) => (
					<InterviewTemplatesItem template={template} key={template.id} />
				))}
			</div>
			<h3 className="title_s total">
				{t('interviewTemplates.total')}&#58; ...
			</h3>
		</section>
	);
};

export default InterviewTemplatesPage;
