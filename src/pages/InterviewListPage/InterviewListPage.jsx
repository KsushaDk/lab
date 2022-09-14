import React, { useState, useEffect } from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Table } from 'Components/ui/table/Table';
import { columnsInterviews } from 'Utils/constants';
import { useInterviews } from 'Hooks/useInterviews';

export const InterviewListPage = () => {
	const { interviews } = useInterviews();

	const [interviewsData, setInterviewData] = useState(interviews);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = interviews.filter((interview) =>
			interview.title
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		setInterviewData(newData);

		if (e.target.search.value === '') {
			setInterviewData(interviews);
		}
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
			<Table
				caption="Мои опросы"
				rows={interviewsData}
				columns={columnsInterviews}
				total="Всего опросов"
			/>
		</section>
	);
};
