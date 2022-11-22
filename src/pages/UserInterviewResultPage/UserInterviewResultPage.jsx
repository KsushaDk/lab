import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getFromLSByKey } from 'Utils/funcForLSByKey';

const UserInterviewResult = React.lazy(() =>
	import('Components/UserInterviewResult/UserInterviewResult')
);

const UserInterviewResultPage = () => {
	const [interview, setInterview] = useState(null);
	const { t } = useTranslation();

	const { interviewId, userId } = useParams();

	useEffect(() => {
		const interviewData = getFromLSByKey('interviews').find(
			(item) => item.id === interviewId
		);
		setInterview(interviewData);
	}, []);

	return (
		<section className="content">
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				{interview && (
					<h2 className="title_s">
						{t('interviewResultsPage.title')}&#58;&nbsp;
						<span className="title_s_red">{interview.title}</span>
					</h2>
				)}
				<UserInterviewResult userId={userId} interviewId={interviewId} />
			</ErrorBoundary>
		</section>
	);
};

export default UserInterviewResultPage;
