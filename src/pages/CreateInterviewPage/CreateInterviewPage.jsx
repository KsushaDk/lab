import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { interviewQuery } from 'Constants/constants';
import { getUserData } from 'Utils/getUserData';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { getNotification } from 'Utils/getNotification';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import { getInterviewQueries } from 'Utils/getInterviewQueries';
import { validateInterviewState } from 'Utils/validateInterviewState';
import {
	getFromLSByKey,
	setToLSByKey,
	updateDataInLS,
} from 'Utils/funcForLSByKey';
import './CreateInterviewPage.scss';

const QuestionTypeList = React.lazy(() =>
	import('Components/QuestionTypeList/QuestionTypeList')
);
const InterviewQueryList = React.lazy(() =>
	import('Components/InterviewQueryList/InterviewQueryList')
);
const InterviewQuestionList = React.lazy(() =>
	import('Components/InterviewQuestionList/InterviewQuestionList')
);
const SaveCancelActionBtns = React.lazy(() =>
	import('Components/ActionItems/SaveCancelActionBtns')
);
const InterviewInfo = React.lazy(() =>
	import('Components/InterviewInfo/InterviewInfo')
);

const CreateInterviewPage = () => {
	const [interview, setInterview] = useState(null);
	const [interviewQueries, setInterviewQueries] = useState(interviewQuery);

	const { t } = useTranslation();

	const handleInterviewTitle = (e) => {
		setInterview({
			...interview,
			title: e.target.value,
		});
	};

	const handleChangeQuery = (e) => {
		const updatedQueries = toggleValueByKey(
			interviewQueries,
			e.currentTarget.id,
			'checked'
		);
		setInterviewQueries(updatedQueries);
	};

	const handleAddQuestion = (e) => {
		setInterview({
			...interview,
			questions: [
				...interview.questions,
				addDefaultValue.question(e.target.getAttribute('name')),
			],
		});
	};

	const handleRemoveQuestion = (id) => {
		const newQuestions = removeFromArrByID(interview.questions, id);
		setInterview({
			...interview,
			questions: newQuestions,
		});
	};

	const handleSaveQuestion = (id, item) => {
		const newQuestions = interview.questions.map((question) => {
			if (question.id === id) {
				return item;
			}
			return question;
		});

		setInterview({
			...interview,
			questions: newQuestions,
		});
	};

	const handleRemoveInterview = () => {
		const interviewsFromLS = getFromLSByKey('interviews');
		const updatedInterviews = removeFromArrByID(interviewsFromLS, interview.id);

		setToLSByKey('interviews', updatedInterviews);

		getNotification.success(t('infoMessage.deleteInterview'));

		setInterview(addDefaultValue.interview());
	};

	const handleSaveInterview = () => {
		const validationMessage = validateInterviewState(interview);

		if (validationMessage === 'saveInterview') {
			const { currentUser } = getUserData();

			updateDataInLS('users', {
				...currentUser,
				interviews: [...currentUser.interviews, interview.id],
			});

			updateDataInLS('interviews', {
				...interview,
				changed: new Date(Date.now()).toLocaleDateString(),
				link: `/interview/${interview.id}`,
				results: `/home/results/${interview.id}`,
				author: currentUser.id,
			});

			getNotification.success(t(`infoMessage.${validationMessage}`));

			setInterview(addDefaultValue.interview());
		} else {
			getNotification.failed(t(`infoMessage.${validationMessage}`));
		}
	};

	useEffect(() => {
		const updatedQueries = getInterviewQueries();

		setInterview({
			...interview,
			queries: updatedQueries,
		});
	}, [interviewQueries]);

	useEffect(() => {
		setInterview(addDefaultValue.interview());
	}, []);

	return (
		<section className="content">
			{interview && (
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<div className="content__head">
						<h2 className="title_m">{t('createInterview.title')}</h2>
						{/* <div>{t('createInterview.date', { date: new Date() })}</div> */}
						<input
							className="content__head_input"
							placeholder={t('createInterview.placeholderName')}
							value={interview?.title}
							onChange={handleInterviewTitle}
						/>
					</div>
					<InterviewInfo pages={1} questions={interview?.questions.length} />
					<div className="btn_group">
						<SaveCancelActionBtns
							handleSaveEditing={handleSaveInterview}
							handleCancelEditing={handleRemoveInterview}
						/>
					</div>
					<div className="content__body">
						<div className="content__body_left">
							<InterviewQuestionList
								interview={interview}
								setInterview={setInterview}
								queries={interviewQueries}
								handleRemoveInterview={handleRemoveInterview}
								handleRemoveQuestion={handleRemoveQuestion}
								handleSaveQuestion={handleSaveQuestion}
							/>
						</div>

						<aside className="content__body_right">
							<QuestionTypeList handleAddQuestion={handleAddQuestion} />
							{interviewQueries && (
								<InterviewQueryList
									queries={interviewQueries}
									handleChangeQuery={handleChangeQuery}
								/>
							)}
						</aside>
					</div>
				</ErrorBoundary>
			)}
		</section>
	);
};

export default CreateInterviewPage;
