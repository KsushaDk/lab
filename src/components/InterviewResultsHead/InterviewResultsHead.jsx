import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { SecondaryBtn } from 'Components/ui/button/SecondaryBtn/SecondaryBtn';
import CustomSelect from 'Components/ui/select/CustomSelect/CustomSelect';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { propTypesConst } from 'Constants/propTypesConst';

export const InterviewResultsHead = ({
	results,
	handleSelectChange,
	dataForSelect,
	singleSelected,
	userName,
}) => {
	const [btnsState, setBtnsState] = useState(false);

	const { t } = useTranslation();

	useEffect(() => {
		if (results.total) {
			setBtnsState((prevState) => !prevState);
		}
	}, []);
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<h2 className="title_s">
				{t('interviewResultsPage.title')}&#58;&nbsp;
				<span className="title_s_red">{results.title}</span>
			</h2>
			<div className="content__head">
				<InterviewInfo pages={1} questions={results.questions.length} />
			</div>
			<div className="content__head">
				<SecondaryBtn
					btnValue={t('btnValues.sumQuestions')}
					isActive={btnsState}
				/>
				<SecondaryBtn
					btnValue={t('btnValues.separateAnswers')}
					isActive={!btnsState}
				/>
				<h2 className="p_info">
					{t('interviewResultsPage.total')}&#58;&nbsp;
					{results.answers?.length || results.total}
				</h2>
			</div>

			{userName && (
				<h2 className="title_s">
					{t('interviewResultsPage.username')}&#58;&nbsp;
					<span className="title_s_red">{userName}</span>
				</h2>
			)}

			<CustomSelect
				data={dataForSelect}
				handleChange={handleSelectChange}
				singleSelected={singleSelected}
				multi={!singleSelected}
			/>
		</ErrorBoundary>
	);
};

InterviewResultsHead.propTypes = {
	results: propTypesConst.interviewDataItem.isRequired,
	dataForSelect: PropTypes.arrayOf(propTypesConst.selectItem),
	singleSelected: propTypesConst.userDataItem,
	handleSelectChange: PropTypes.func,
	userName: PropTypes.string,
};

InterviewResultsHead.defaultProps = {
	dataForSelect: null,
	singleSelected: null,
	userName: null,
	handleSelectChange: () => {},
};
