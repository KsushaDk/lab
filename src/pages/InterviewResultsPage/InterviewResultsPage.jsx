import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { getDataForInterviewResults } from 'Utils/getDataForInterviewResults';
import InterviewResultsItem from './InterviewResultsItem';
import './InterviewResultsPage.scss';

const InterviewResultsPage = () => {
	const [interviewResults, setInterviewResults] = useState(null);

	const { t } = useTranslation();

	const { interviewId } = useParams();

	useEffect(() => {
		const interviewData = getDataForInterviewResults(interviewId);

		setInterviewResults(interviewData);
	}, []);

	return (
		<section className="content">
			{interviewResults && (
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<h2 className="title_s">
						{t('interviewResultsPage.title')}&#58;&nbsp;
						{interviewResults.title}
					</h2>
					<div className="content__head">
						<InterviewInfo
							pages={1}
							questions={interviewResults.questions.length}
						/>
						<h2 className="p_info">
							{t('interviewResultsPage.total')}&#58;&nbsp;
							{interviewResults.total}
						</h2>
					</div>

					<div className="content__body_center">
						{interviewResults.questions.map((question) => (
							<InterviewResultsItem
								key={question.id}
								question={question}
								interview={interviewResults}
							/>
						))}
					</div>
				</ErrorBoundary>
			)}
		</section>
	);
};

export default InterviewResultsPage;
