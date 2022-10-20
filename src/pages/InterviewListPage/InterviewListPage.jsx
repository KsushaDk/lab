import React, { useState, useEffect } from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { InterviewTable } from 'Components/InterviewTable/InterviewTable';
import { infoMessage } from 'Constants/constants';
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
		interviews && setInterviewData([...interviews]);
	}, []);

	return (
		<section className="content">
			<div className="content__head">
				<PrimaryBtn
					btnValue={{ value: 'Создать опрос', link: '/home/create' }}
				/>
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			{!interviewData ? (
				<h2 className="title_s">{infoMessage.noInterviews}</h2>
			) : (
				<InterviewTable
					interviewData={interviewData}
					searchResult={searchResult}
				/>
			)}
		</section>
	);
};
