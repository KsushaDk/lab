import React from 'react';
import { SearchInput } from '../../components/ui/input/SearchInput';

export const UserListPage = () => (
	<section className="main__content">
		<SearchInput />
		<table className="main__content_table">
			<caption>Пользователи</caption>
			<thead>
				<tr>
					<th scope="col">Имя</th>
					<th scope="col">Роль</th>
					<th scope="col">Зарегистрирован</th>
					<th scope="col">Опросы</th>
					<th scope="col">Действия</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Админ</td>
					<td>Администратор</td>
					<td>01.01.2020</td>
					<td>10</td>
					<td>delete</td>
				</tr>
				<tr>
					<td>Юзер 1</td>
					<td>Пользователь</td>
					<td>02.02.2021</td>
					<td>5</td>
					<td>create</td>
				</tr>
				<tr>
					<td>Юзер 2</td>
					<td>Пользователь</td>
					<td>05.05.2022</td>
					<td>2</td>
					<td>create</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th scope="row">Всего пользователей:</th>
					<td colSpan="2">...</td>
					<td colSpan="2"> === </td>
				</tr>
			</tfoot>
		</table>
	</section>
);
