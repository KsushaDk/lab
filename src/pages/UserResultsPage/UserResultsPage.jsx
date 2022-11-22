import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { getUserData } from 'Utils/getUserData';

const InterviewResultsHead = React.lazy(() =>
	import('Components/InterviewResultsHead/InterviewResultsHead')
);
const UserInterviewResult = React.lazy(() =>
	import('Components/UserInterviewResult/UserInterviewResult')
);

const UserResultsPage = () => {
	const navigate = useNavigate();

	const { interviewId, userId } = useParams();

	const { users } = getUserData();

	const selectedUser = users.find((user) => user.id === userId);

	const selectedInterview = getFromLSByKey('interviews').find(
		(user) => user.id === interviewId
	);

	const handleSelectChange = useCallback((data) => {
		data &&
			navigate(`/home/results/${interviewId}/${data.id}`, { replace: true });
	});

	return (
		<section className="content">
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				{selectedInterview && (
					<InterviewResultsHead
						results={selectedInterview}
						handleSelectChange={handleSelectChange}
						dataForSelect={users.map((user) => ({
							...user,
							title: user.username,
						}))}
						singleSelected={{ ...selectedUser, title: selectedUser.username }}
						userName={selectedUser?.username}
					/>
				)}
				<UserInterviewResult userId={userId} interviewId={interviewId} />
			</ErrorBoundary>
		</section>
	);
};

export default UserResultsPage;
