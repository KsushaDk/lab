import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { updateInterviews } from 'Redux/slices/interviewSlice';
import { columnsInterviews, failedNotification } from 'Constants/constants';

import { TableWrapper } from '../ui/table/TableWrapper';

export const InterviewTable = ({ interviewData, searchResult }) => {
	const failed = (message) => toast.error(message, failedNotification);

	const handleInterviewChange = (value) => {
		const checkUniqueTitle = interviewData.find((item) => item.title === value);

		if (checkUniqueTitle !== undefined) {
			failed('Название опроса должно быть уникальным');
			return false;
		}

		return true;
	};

	return (
		<TableWrapper
			slice={updateInterviews}
			caption="Мои опросы"
			total="Всего опросов"
			columns={columnsInterviews}
			rows={interviewData}
			searchResult={searchResult}
			handleInterviewChange={handleInterviewChange}
		/>
	);
};

InterviewTable.propTypes = {
	interviewData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	).isRequired,
	searchResult: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	),
};

InterviewTable.defaultProps = {
	searchResult: null,
};
