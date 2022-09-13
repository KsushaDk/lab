import React, { useState } from 'react';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Table } from 'Components/ui/table/Table';
import { columnsUsers, dataUsers } from 'Utils/constants';
// import { useAuth } from 'Hooks/useAuth';

export const UserListPage = () => {
	// const { users } = useAuth();

	const [userData, setUserData] = useState(dataUsers);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = dataUsers.filter((user) =>
			user.username
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		setUserData(newData);

		if (e.target.search.value === '') {
			setUserData(dataUsers);
		}
	};

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
