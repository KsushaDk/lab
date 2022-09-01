import React from 'react';
import { NavBtn } from '../../components/ui/button/NavBtn';
import { SearchInput } from '../../components/ui/input/SearchInput/SearchInput';

export const InterviewListPage = () => (
	<section className="main__content">
		<SearchInput />

		<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />

		<table className="main__content_table">
			<caption>Мои опросы</caption>
			<thead>
				<tr>
					<th scope="col">Название</th>
					<th scope="col">Изменен</th>
					<th scope="col">Ответы</th>
					<th scope="col">Ссылка</th>
					<th scope="col">Результаты</th>
					<th scope="col">Действия</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Опрос 1</td>
					<td>01.01.2020</td>
					<td>10</td>
					<td>
						<a href="/">www.blabla.com</a>
					</td>
					<td>
						<a href="/">результаты</a>
					</td>
					<td>delete</td>
				</tr>
				<tr>
					<td>Опрос 2</td>
					<td>02.02.2022</td>
					<td>5</td>
					<td>
						<a href="/">www.blabla.com</a>
					</td>
					<td>
						<a href="/">результаты</a>
					</td>
					<td>delete</td>
				</tr>
				<tr>
					<td>Опрос 3</td>
					<td>03.03.2022</td>
					<td>3</td>
					<td>
						<a href="/">www.blabla.com</a>
					</td>
					<td>
						<a href="/">результаты</a>
					</td>
					<td>delete</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th scope="row">Всего опросов:</th>
					<td colSpan="2">...</td>
					<td colSpan="3"> === </td>
				</tr>
			</tfoot>
		</table>
	</section>
);
