import React from 'react';
import { SearchInput } from 'Components/ui/input/SearchInput/SearchInput';
import { Table } from 'Components/ui/table/Table';

export const UserListPage = () => {
	const columns = [
		{ field: 'username', fieldName: 'Имя' },
		{ field: 'role', fieldName: 'Роль' },
		{ field: 'date', fieldName: 'Зарегистрирован' },
		{ field: 'interviews', fieldName: 'Опросы' },
		{ field: 'actions', fieldName: 'Действия' },
	];
	const data = [
		{
			id: 1,
			username: 'Админ',
			role: 'Администратор',
			date: '01.01.2020',
			interviews: 10,
		},
		{
			id: 2,
			username: 'Юзер1',
			role: 'Пользователь',
			date: '02.01.2021',
			interviews: 5,
		},
		{
			id: 3,
			username: 'Юзер2',
			role: 'Пользователь',
			date: '03.01.2021',
			interviews: 1,
		},
		{
			id: 4,
			username: 'Юзер3',
			role: 'Пользователь',
			date: '04.01.2022',
			interviews: 7,
		},
		{
			id: 5,
			username: 'Юзер4',
			role: 'Пользователь',
			date: '05.01.2022',
			interviews: 4,
		},
		{
			id: 6,
			username: 'Юзер5',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 7,
			username: 'Юзер6',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 8,
			username: 'Юзер7',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 9,
			username: 'Юзер8',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 10,
			username: 'Юзер9',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 11,
			username: 'Юзер10',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 12,
			username: 'Юзер11',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 13,
			username: 'Юзер12',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 14,
			username: 'Юзер13',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
		{
			id: 15,
			username: 'Юзер14',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
		},
	];

	return (
		<section className="main__content">
			<SearchInput />
			<Table
				caption="Пользователи"
				columns={columns}
				rows={data}
				total="Всего пользователей"
			/>
		</section>
	);
};
