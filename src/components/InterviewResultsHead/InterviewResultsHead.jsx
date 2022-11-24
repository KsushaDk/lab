import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { propTypesConst } from 'Constants/propTypesConst';

const CustomSelect = React.lazy(() =>
	import('Components/ui/select/CustomSelect/CustomSelect')
);
const InterviewInfo = React.lazy(() =>
	import('Components/InterviewInfo/InterviewInfo')
);

const InterviewResultsHead = ({
	results,
	handleSelectChange,
	dataForSelect,
	singleSelected,
	userName,
}) => {
	const [btnsState, setBtnsState] = useState('');

	const { t } = useTranslation();

	useEffect(() => {
		if (results.total) {
			setBtnsState('sum');
		} else setBtnsState('separate');
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
				<div
					className={
						btnsState === 'sum'
							? 'result_state__btn active_btn-state'
							: 'result_state__btn'
					}
				>
					{t('btnValues.sumQuestions')}
				</div>
				<div
					className={
						btnsState === 'separate'
							? 'result_state__btn active_btn-state'
							: 'result_state__btn'
					}
				>
					{t('btnValues.separateAnswers')}
				</div>
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

export default InterviewResultsHead;
