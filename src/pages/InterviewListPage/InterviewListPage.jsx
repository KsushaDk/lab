import React from 'react';
import { NavBtn } from 'Components/ui/button/NavBtn';
import { SearchInput } from 'Components/ui/input/SearchInput/SearchInput';
import { Table } from 'Components/ui/table/Table';

export const InterviewListPage = () => {
	const cols = [
		'Название',
		'Изменен',
		'Ответы',
		'Ссылка',
		'Результаты',
		'Действия',
	];
	const interviewsData = [
		{
			name: 'Опрос 1',
			date: '01.01.2020',
			answers: 10,
			link: 'www.blabla.com',
			results: 'результаты',
			activity: 'delete',
		},
		{
			name: 'Опрос 2',
			date: '02.01.2020',
			answers: 14,
			link: 'www.blabla.com',
			results: 'результаты',
			activity: 'delete',
		},
		{
			name: 'Опрос 3',
			date: '03.01.2020',
			answers: 3,
			link: 'www.blabla.com',
			results: 'результаты',
			activity: 'delete',
		},
	];

	return (
		<section className="main__content">
			<SearchInput />

			<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			<Table
				caption="Мои опросы"
				data={interviewsData}
				cols={cols}
				total="Всего опросов"
			/>
		</section>
	);
};
