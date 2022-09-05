import React from 'react';
import { NavBtn } from 'Components/ui/button/NavBtn';
import { SearchInput } from 'Components/ui/input/SearchInput/SearchInput';
import { Table } from 'Components/ui/table/Table';

export const InterviewListPage = () => {
	const columns = [
		{ field: 'title', fieldName: 'Название' },
		{ field: 'changed', fieldName: 'Изменен' },
		{ field: 'answers', fieldName: 'Ответы' },
		{ field: 'link', fieldName: 'Ссылка' },
		{ field: 'results', fieldName: 'Результаты' },
		{ field: 'actions', fieldName: 'Действия' },
	];
	const data = [
		{
			id: 1,
			title: 'Опрос 1',
			changed: '01.01.2020',
			answers: 10,
			link: 'www.blabla.com',
			results: 'результаты',
		},
		{
			id: 2,
			title: 'Опрос 2',
			changed: '02.01.2020',
			answers: 14,
			link: 'www.blabla.com',
			results: 'результаты',
		},
		{
			id: 3,
			title: 'Опрос 3',
			changed: '03.01.2020',
			answers: 3,
			link: 'www.blabla.com',
			results: 'результаты',
		},
	];

	return (
		<section className="main__content">
			<SearchInput />

			<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			<Table
				caption="Мои опросы"
				rows={data}
				columns={columns}
				total="Всего опросов"
			/>
		</section>
	);
};
