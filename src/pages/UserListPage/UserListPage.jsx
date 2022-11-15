import React, { useState, useEffect } from 'react';
import { getSearchResult } from 'Utils/getSearchResult';
import { getFromLSByKey } from 'Utils/funcForLSByKey';

const UserTable = React.lazy(() => import('Components/UserTable/UserTable'));
const SearchForm = React.lazy(() =>
	import('Components/ui/form/SearchForm/SearchForm')
);

const UserListPage = () => {
	const [userData, setUserData] = useState(null);
	const [searchResult, setSearchResult] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const search = getSearchResult(userData, e.target.search.value, 'username');
		setSearchResult(search);
	};

	useEffect(() => {
		const users = getFromLSByKey('users');
		setUserData(users);
	}, []);

	return (
		<section className="content">
			<SearchForm handleSubmit={handleSubmit} />
			{userData && (
				<UserTable userData={userData} searchResult={searchResult} />
			)}
		</section>
	);
};

export default UserListPage;
