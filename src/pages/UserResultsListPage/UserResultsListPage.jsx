import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSearchResult } from 'Utils/getSearchResult';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { getUserData } from 'Utils/getUserData';
import { columnsUserInterviews } from 'Constants/constants';

const Table = React.lazy(() => import('Components/ui/table/Table'));
const SearchForm = React.lazy(() =>
	import('Components/ui/form/SearchForm/SearchForm')
);

const UserResultsListPage = () => {
	const [userAnswers, setUserAnswers] = useState(null);
	const [searchResult, setSearchResult] = useState(null);

	const { t } = useTranslation();

	const { currentUser } = getUserData();

	const handleSubmit = (e) => {
		e.preventDefault();

		const search = getSearchResult(userAnswers, e.target.search.value, 'title');
		setSearchResult(search);
	};

	useEffect(() => {
		const answers = getFromLSByKey('answers');
		const userAnswersData = answers
			.filter((item) => item.userId === currentUser.id)
			.map((item) => ({
				id: item.id,
				title: item.title,
				results: `${item.id}/${currentUser.id}`,
			}));

		answers && setUserAnswers(userAnswersData);
	}, []);

	return (
		<section className="content">
			<div className="content__head">
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			{!userAnswers ? (
				<h2 className="title_s">{t('infoMessage.noUserAnswers')}</h2>
			) : (
				<Table
					caption={t('userAnswersListPage.total')}
					columns={columnsUserInterviews}
					rows={userAnswers}
					total={t('interviewResultsPage.total')}
					searchResult={searchResult}
				/>
			)}
		</section>
	);
};

UserResultsListPage.propTypes = {};

export default UserResultsListPage;
