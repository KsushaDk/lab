import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { getSearchResult } from 'Utils/getSearchResult';
import { getFromLSByKey } from 'Utils/funcForLSByKey';

const InterviewTable = React.lazy(() =>
	import('Components/InterviewTable/InterviewTable')
);
const SearchForm = React.lazy(() =>
	import('Components/ui/form/SearchForm/SearchForm')
);

const InterviewListPage = () => {
	const [interviewData, setInterviewData] = useState(null);
	const [searchResult, setSearchResult] = useState(null);

	const { t } = useTranslation();

	const handleSubmit = (e) => {
		e.preventDefault();

		const search = getSearchResult(
			interviewData,
			e.target.search.value,
			'title'
		);
		setSearchResult(search);
	};

	useEffect(() => {
		const interviews = getFromLSByKey('interviews');
		interviews && setInterviewData([...interviews]);
	}, []);

	return (
		<section className="content">
			<div className="content__head">
				<PrimaryBtn
					btnValue={{ key: 'createInterview', link: '/home/create' }}
				/>
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			{!interviewData ? (
				<h2 className="title_s">{t('infoMessage.noInterviews')}</h2>
			) : (
				<InterviewTable
					interviewData={interviewData}
					searchResult={searchResult}
				/>
			)}
		</section>
	);
};

export default InterviewListPage;
