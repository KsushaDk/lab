import React, { useState, useEffect } from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { InterviewTable } from 'Components/InterviewTable/InterviewTable';
import { Loader } from 'Components/Loader/Loader';
import { getSearchResult } from 'Utils/getSearchResult';
import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const InterviewListPage = () => {
	const [interviewData, setInterviewData] = useState(null);
	const [searchResult, setSearchResult] = useState(null);

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

		if (interviews !== null) {
			setInterviewData([...interviews]);
		}
	}, []);

	return (
		<section className="content">
			<div className="content__head">
				<PrimaryBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			{interviewData === null ? (
				<Loader />
			) : (
				<InterviewTable
					interviewData={interviewData}
					searchResult={searchResult}
				/>
			)}
		</section>
	);
};
