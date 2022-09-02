import React from 'react';
import { SearchInput } from 'Components/ui/input/SearchInput/SearchInput';
import { Table } from 'Components/ui/table/Table';

export const UserListPage = () => {
	const cols = ['Имя', 'Роль', 'Зарегистрирован', 'Опросы', 'Действия'];
	const usersData = [
		{
			name: 'Админ',
			role: 'Администратор',
			date: '01.01.2020',
			interviews: 10,
			activity: 'delete',
		},
		{
			name: 'Юзер1',
			role: 'Пользователь',
			date: '02.01.2021',
			interviews: 5,
			activity: 'create',
		},
		{
			name: 'Юзер2',
			role: 'Пользователь',
			date: '03.01.2021',
			interviews: 1,
			activity: 'delete',
		},
		{
			name: 'Юзер3',
			role: 'Пользователь',
			date: '04.01.2022',
			interviews: 7,
			activity: 'create',
		},
		{
			name: 'Юзер4',
			role: 'Пользователь',
			date: '05.01.2022',
			interviews: 4,
			activity: 'create',
		},
		{
			name: 'Юзер5',
			role: 'Пользователь',
			date: '06.01.2022',
			interviews: 13,
			activity: 'delete',
		},
	];

	return (
		<section className="main__content">
			<SearchInput />
			<Table
				caption="Пользователи"
				cols={cols}
				data={usersData}
				total="Всего пользователей"
			/>
		</section>
	);
};
