import React, { useState } from 'react';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { SearchForm } from 'Components/ui/form/SearchForm/SearchForm';
import { Table } from 'Components/ui/table/Table';
import { dataInterviews, columnsInterviews } from 'Utils/constants';

export const InterviewListPage = () => {
	const [interviews, setInterviews] = useState(dataInterviews);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = dataInterviews.filter((interview) =>
			interview.title
				.toLowerCase()
				.includes(e.target.search.value.toLowerCase().trim())
		);

		setInterviews(newData);

		if (e.target.search.value === '') {
			setInterviews(dataInterviews);
		}
	};

	return (
		<section className="content">
			<div className="content__head">
				<PrimaryBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
				<SearchForm handleSubmit={handleSubmit} />
			</div>
			<Table
				caption="Мои опросы"
				rows={interviews}
				columns={columnsInterviews}
				total="Всего опросов"
			/>
		</section>
	);
};
