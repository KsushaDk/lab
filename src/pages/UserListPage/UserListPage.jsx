import React, { useState } from 'react';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Table } from 'Components/ui/table/Table';
import { dataUsers, columnsUsers } from 'Utils/constants';

export const UserListPage = () => {
	const [users, setUsers] = useState(dataUsers);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = dataUsers.filter((user) =>
			user.username
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		setUsers(newData);

		if (e.target.search.value === '') {
			setUsers(dataUsers);
		}
	};

	return (
		<section className="content">
			<SearchForm handleSubmit={handleSubmit} />
			<Table
				caption="Пользователи"
				columns={columnsUsers}
				rows={users}
				total="Всего пользователей"
			/>
		</section>
	);
};
