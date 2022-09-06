import React, { useState } from 'react';
import { NavBtn } from 'Components/ui/button/NavBtn';
import { SearchInput } from 'Components/ui/input/SearchInput/SearchInput';
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
		<section className="main__content">
			<SearchInput handleSubmit={handleSubmit} />

			<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			<Table
				caption="Мои опросы"
				rows={interviews}
				columns={columnsInterviews}
				total="Всего опросов"
			/>
		</section>
	);
};
