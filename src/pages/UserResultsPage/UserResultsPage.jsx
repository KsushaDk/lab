import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsAsterisk } from 'react-icons/bs';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getOptionToRender } from 'Constants/OptionType';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { getOptionType } from 'Utils/getOptionType';
import { getUserData } from 'Utils/getUserData';
import ActionCorrectMark from '../../components/ActionItems/ActionCorrectMark';

const InterviewResultsHead = React.lazy(() =>
	import('Components/InterviewResultsHead/InterviewResultsHead')
);

const UserResultsPage = () => {
	const [userResults, setUserResults] = useState(null);

	const navigate = useNavigate();

	const { t } = useTranslation();

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

	useEffect(() => {
		const answersFromLS = getFromLSByKey('answers');
		const userAnswers = answersFromLS?.filter(
			(answer) => answer.userId === userId
		);
		const userResultsData = userAnswers.filter(
			(interview) => interview.id === interviewId
		);

		setUserResults(userResultsData[0]);
	}, [userId]);

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

				{userResults ? (
					<div className="content__body_center">
						{userResults.questions.map((question, index) => (
							<div className="content__body_item_center" key={question.id}>
								<h2 className="title_xs">
									{userResults.queries.questionNum && `${index + 1}.`}&nbsp;
									{question.question}
									&nbsp;
									{question.required && (
										<>
											&#40;
											<BsAsterisk className="icon_red icon_xs" />
											&#41;
										</>
									)}
								</h2>
								<ul className="question__list" role="menu">
									{question.options.map((option) => (
										<li
											className="question__list_option"
											role="menuitem"
											aria-label="option"
											key={option.id}
											id={option.id}
										>
											{getOptionToRender(option)[getOptionType(question.type)]}
											{option.correct && <ActionCorrectMark />}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				) : (
					<div className="content__body_center">
						<h2 className="title_xs">{t('infoMessage.noUsersAnswer')}</h2>
					</div>
				)}
			</ErrorBoundary>
		</section>
	);
};

export default UserResultsPage;
