import React, { useState, useEffect } from 'react';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { useUsers } from 'Hooks/useUsers';
import { UserTable } from 'Components/UserTable/UserTable';

export const UserListPage = () => {
	const { users } = useUsers();

	const [userData, setUserData] = useState(users);
	const [searchResult, setSearchResult] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = users.filter((user) =>
			user.username
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		if (newData === undefined) {
			setSearchResult([]);
		} else if (e.target.search.value === '') {
			setSearchResult(users);
		}

		setSearchResult(newData);
	};

	useEffect(() => {
		setUserData(users);
	}, [users]);

	return (
		<section className="content">
			<SearchForm handleSubmit={handleSubmit} />
			<UserTable userData={userData} searchResult={searchResult} />
		</section>
	);
};
