import React, { useState, useEffect } from 'react';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { useUsers } from 'Hooks/useUsers';
import { UserTable } from 'Components/UserTable/UserTable';
import { getSearchResult } from 'Utils/getSearchResult';

const UserListPage = () => {
	const { users } = useUsers();

	const [userData, setUserData] = useState(users);
	const [searchResult, setSearchResult] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const search = getSearchResult(users, e.target.search.value, 'username');
		setSearchResult(search);
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

export default UserListPage;
