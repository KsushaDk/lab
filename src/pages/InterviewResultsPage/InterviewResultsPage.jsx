import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getDataForInterviewResults } from 'Utils/getDataForInterviewResults';
import './InterviewResultsPage.scss';

const InterviewResultsHead = React.lazy(() =>
	import('Components/InterviewResultsHead/InterviewResultsHead')
);
const InterviewResultsItem = React.lazy(() => import('./InterviewResultsItem'));

const InterviewResultsPage = () => {
	const [interviewResults, setInterviewResults] = useState(null);

	const { t } = useTranslation();

	const { interviewId } = useParams();

	const handleSelectChange = useCallback((data) => {
		setInterviewResults({
			...interviewResults,
			questions: data,
		});
	});

	useEffect(() => {
		const interviewResultsData = getDataForInterviewResults(interviewId);
		setInterviewResults(interviewResultsData);
	}, []);

	return (
		<section className="content">
			{!interviewResults ? (
				<h2 className="title_s">{t('infoMessage.noAnswers')}</h2>
			) : (
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<InterviewResultsHead
						results={interviewResults}
						handleSelectChange={handleSelectChange}
						dataForSelect={interviewResults.questions}
					/>
					<div className="content__body_center">
						{interviewResults.questions.map((question) => {
							if (question.checked) {
								return (
									<InterviewResultsItem
										key={question.id}
										question={question}
										interview={interviewResults}
									/>
								);
							}
							return null;
						})}
					</div>
				</ErrorBoundary>
			)}
		</section>
	);
};

export default InterviewResultsPage;
