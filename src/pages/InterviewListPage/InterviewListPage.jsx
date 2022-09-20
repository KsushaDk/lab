import React, { useState, useEffect } from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { useInterviews } from 'Hooks/useInterviews';
import { InterviewTable } from 'Components/InterviewTable/InterviewTable';

export const InterviewListPage = () => {
	const { interviews } = useInterviews();

	const [interviewData, setInterviewData] = useState(interviews);
	const [searchResult, setSearchResult] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newData = interviews.filter((interview) =>
			interview.title
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		if (newData === undefined) {
			setSearchResult([]);
		} else if (e.target.search.value === '') {
			setSearchResult(interviews);
		}

		setSearchResult(newData);
	};

	useEffect(() => {
		setInterviewData(interviews);
	}, [interviews]);

	return (
		<section className="content">
			<div className="content__head">
				<PrimaryBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			<InterviewTable
				interviewData={interviewData}
				searchResult={searchResult}
			/>
		</section>
	);
};
