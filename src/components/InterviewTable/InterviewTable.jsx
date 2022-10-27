import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getNotification } from 'Utils/getNotification';
import { columnsInterviews } from 'Constants/constants';
import { propTypesConst } from 'Constants/propTypesConst';
import { TableWrapper } from '../ui/table/TableWrapper';

export const InterviewTable = ({ interviewData, searchResult }) => {
	const { t } = useTranslation();

	const handleInterviewChange = (value) => {
		const checkUniqueTitle = interviewData.find((item) => item.title === value);

		if (checkUniqueTitle !== undefined) {
			getNotification.failed(t('infoMessage.uniqueInterviewTitle'));
			return false;
		}

		return true;
	};

	return (
		<TableWrapper
			storageName="interviews"
			caption={t('interviewTable.caption')}
			total={t('interviewTable.total')}
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
