import React, { useState, useEffect } from 'react';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Table } from 'Components/ui/table/Table';
import { columnsUsers } from 'Utils/constants';
import { useUsers } from 'Hooks/useUsers';

export const UserListPage = () => {
	const { users } = useUsers();

	const [userData, setUserData] = useState(users);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = users.filter((user) =>
			user.username
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		setUserData(newData);

		if (e.target.search.value === '') {
			setUserData(users);
		}
	};

	useEffect(() => {
		setUserData(users);
	}, [users]);

	return (
		<section className="content">
			<SearchForm handleSubmit={handleSubmit} />
			<Table
				caption="Пользователи"
				columns={columnsUsers}
				rows={userData}
				total="Всего пользователей"
			/>
		</section>
	);
};
