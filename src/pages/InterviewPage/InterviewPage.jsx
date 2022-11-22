import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { BsAsterisk } from 'react-icons/bs';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getOptionToRender } from 'Constants/OptionType';
import { getFromLSByKey, updateDataInLS } from 'Utils/funcForLSByKey';
import { checkRequeredField } from 'Utils/checkRequiredField';
import { toggleOptionClick } from 'Utils/toggleOptionClick';
import { getNotification } from 'Utils/getNotification';
import { getOptionType } from 'Utils/getOptionType';
import { findInArrByID } from 'Utils/findInArrByID';
import { shuffleArray } from 'Utils/shuffleArray';
import { getUserData } from 'Utils/getUserData';

const SaveCancelActionBtns = React.lazy(() =>
	import('Components/ActionItems/SaveCancelActionBtns')
);
const SecondaryInput = React.lazy(() =>
	import('Components/ui/input/SecondaryInput/SecondaryInput')
);
const PrimaryDropDown = React.lazy(() =>
	import('Components/ui/dropdown/PrimaryDropDown')
);
const ProgressBar = React.lazy(() =>
	import('Components/ui/progressbar/ProgressBar')
);

const InterviewPage = () => {
	const [interview, setInterview] = useState(null);
	const [percent, setPercent] = useState(1);

	const { t } = useTranslation();

	const navigate = useNavigate();
	const { interviewId } = useParams();

	const { currentUser } = getUserData();

	const interviewFromLS = findInArrByID(
		getFromLSByKey('interviews'),
		interviewId
	);

	const handleSelectionAnswer = (e, id, type) => {
		if (type !== 'text') {
			const newQuestions = interview.questions.map((question) => {
				if (question.id === id) {
					const newOptions = toggleOptionClick(
						question.options,
						e.currentTarget.id,
						type,
						'checked'
					);
					question.options = newOptions;
				}
				return question;
			});

			setInterview({
				...interview,
				questions: newQuestions,
			});
		}
	};

	const handleSelectionTextAnswer = (e, id) => {
		if (e.target.value === '') {
			return getNotification.failed(t('infoMessage.notEmptyField'));
		}

		const newQuestions = interview.questions.map((question) => {
			if (question.id === id) {
				question.options[0].title = e.target.value;
				question.options[0].checked = true;
			}
			return question;
		});

		setInterview({
			...interview,
			questions: newQuestions,
		});
	};

	const handleSaveCancelAnswers = useCallback((value) => {
		if (value === 'cancel') {
			return navigate('/info', {
				state: {
					message: t('infoMessage.cancelInterviewAnswers'),
					link: '/home',
				},
				replace: true,
			});
		}

		const checkRequired = checkRequeredField(interview.questions);

		if (!checkRequired) {
			navigate('/info', {
				state: {
					message: t('infoMessage.saveInterviewAnswers'),
					link: '/home',
				},
				replace: true,
			});

			updateDataInLS('interviews', {
				...interviewFromLS,
				answers: Array.from(
					new Set([...interviewFromLS.answers, currentUser.id])
				),
			});

			updateDataInLS('answers', {
				...interview,
				answers: Array.from(new Set([...interview.answers, currentUser.id])),
				userId: currentUser.id,
			});
		} else {
			getNotification.failed(t('infoMessage.requiredField'));
		}
	});

	useEffect(() => {
		if (interview !== null) {
			const questionPercent = Math.ceil(100 / interview.questions.length);

			const selectedQuestions = interview.questions.filter((question) =>
				question.options.find((option) => option.checked === true)
			);

			let currentPercent = selectedQuestions.length * questionPercent;

			if (currentPercent > 100) {
				currentPercent = 100;
			}

			setPercent(currentPercent);
		}
	}, [interview]);

	useEffect(() => {
		if (interviewFromLS.queries.randomQuestionOrder) {
			shuffleArray(interviewFromLS.questions);
		}

		setInterview(interviewFromLS);
	}, []);

	return (
		<section className="content_center">
			{interview && (
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<div className="btn_group">
						<SaveCancelActionBtns
							handleSaveEditing={() => handleSaveCancelAnswers('save')}
							handleCancelEditing={() => handleSaveCancelAnswers('cancel')}
						/>
					</div>
					<div className="content__head_center">
						<h2 className="title_s">
							{t('interviewPage.title')}&#58;{' '}
							<span className="title_s_red">{interview.title}</span>
						</h2>
					</div>

					<div className="content__body_center">
						{interview.questions.map((question, index) => (
							<div className="content__body_item_center" key={question.id}>
								{interview.queries.requiredFields && question.required && (
									<PrimaryDropDown
										trigger={<BsAsterisk className="icon_red icon_s" />}
									>
										<span className="p_primary">
											{t('infoMessage.requiredQuestion')}
										</span>
									</PrimaryDropDown>
								)}
								<h2 className="p_secondary">
									{interview.queries.questionNum && `${index + 1}.`}&nbsp;
									{question.question}
								</h2>
								<ul className="question__list" role="menu">
									{question.options.map((option) => (
										<li
											className="question__list_option"
											role="menuitem"
											aria-label="option"
											key={option.id}
											id={option.id}
											onClick={(e) =>
												handleSelectionAnswer(e, question.id, question.type)
											}
										>
											{question.type !== 'text' ? (
												getOptionToRender(option)[getOptionType(question.type)]
											) : (
												<SecondaryInput
													name="option"
													id={option.id}
													placeholder={t('infoMessage.enterUserAnswer')}
													defaultValue={option.title}
													handleBlur={(e) =>
														handleSelectionTextAnswer(e, question.id)
													}
												/>
											)}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					{interview.queries.progressBar && (
						<ProgressBar
							length={interview.questions.length}
							percent={percent}
						/>
					)}
				</ErrorBoundary>
			)}
		</section>
	);
};

export default InterviewPage;
