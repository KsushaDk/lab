import React from 'react';
import PropTypes from 'prop-types';
import { getNotification } from 'Utils/getNotification';
import { columnsInterviews, infoMessage } from 'Constants/constants';
import { propTypesConst } from 'Constants/propTypesConst';
import { TableWrapper } from '../ui/table/TableWrapper';

export const InterviewTable = ({ interviewData, searchResult }) => {
	const handleInterviewChange = (value) => {
		const checkUniqueTitle = interviewData.find((item) => item.title === value);

		if (checkUniqueTitle !== undefined) {
			getNotification.failed(infoMessage.uniqueInterviewTitle);
			return false;
		}

		return true;
	};

	return (
		<TableWrapper
			storageName="interviews"
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
	interviewData: PropTypes.arrayOf(propTypesConst.interviewDataItem).isRequired,
	searchResult: PropTypes.arrayOf(propTypesConst.interviewDataItem),
};

InterviewTable.defaultProps = {
	searchResult: null,
};
