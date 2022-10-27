import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { InterviewQueryList } from 'Components/InterviewQueryList/InterviewQueryList';
import { InterviewQuestionList } from 'Components/InterviewQuestionList/InterviewQuestionList';
import { SaveCancelActionBtns } from 'Components/ActionItems/SaveCancelActionBtns';
import { QuestionTypeList } from 'Components/QuestionTypeList/QuestionTypeList';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { interviewQuery } from 'Constants/constants';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { getNotification } from 'Utils/getNotification';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import {
	getFromLSByKey,
	setToLSByKey,
	updateDataInLS,
} from 'Utils/funcForLSByKey';
import './CreateInterviewPage.scss';

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
		if (interview.title === '') {
			getNotification.failed(t('infoMessage.enterInterviewTitle'));
		} else {
			updateDataInLS('interviews', {
				...interview,
				changed: new Date(Date.now()).toLocaleDateString(),
				link: `/interview/${interview.id}`,
				results: `/home/results/${interview.id}`,
			});

			getNotification.success(t('infoMessage.saveInterview'));

			setInterview(addDefaultValue.interview());
		}
	};

	useEffect(() => {
		const updatedQueries = Object.fromEntries(
			interviewQueries.map((query) => [query.key, query.checked])
		);

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
							<InterviewQueryList
								queries={interviewQueries}
								handleChangeQuery={handleChangeQuery}
							/>
						</aside>
					</div>
				</ErrorBoundary>
			)}
		</section>
	);
};

export default CreateInterviewPage;
