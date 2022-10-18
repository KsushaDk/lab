import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsAsterisk } from 'react-icons/bs';
import { SecondaryInput } from 'Components/ui/input/SecondaryInput/SecondaryInput';
import { SaveCancelActionBtns } from 'Components/ActionItems/SaveCancelActionBtns';
import { PrimaryDropDown } from 'Components/ui/dropdown/PrimaryDropDown';
import { ProgressBar } from 'Components/ui/progressbar/ProgressBar';
import { Loader } from 'Components/Loader/Loader';
import { useUsers } from 'Hooks/useUsers';
import { interviewResultMessage, infoMessage } from 'Constants/constants';
import { getOptionToRender } from 'Constants/OptionType';
import { getFromLSByKey, updateDataInLS } from 'Utils/funcForLSByKey';
import { checkRequeredField } from 'Utils/checkRequiredField';
import { toggleOptionClick } from 'Utils/toggleOptionClick';
import { getNotification } from 'Utils/getNotification';
import { getOptionType } from 'Utils/getOptionType';
import { shuffleArray } from 'Utils/shuffleArray';
import './InterviewPage.scss';

export const InterviewPage = () => {
	const [interview, setInterview] = useState(null);
	const [percent, setPercent] = useState(1);

	const navigate = useNavigate();
	const { interviewId } = useParams();

	const { currentUser } = useUsers();

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

	const handleTextAnswer = (e, id) => {
		if (e.target.value === '') {
			return getNotification.failed(infoMessage.notEmptyField);
		}

		const newQuestions = interview.questions.map((question) => {
			if (question.id === id) {
				question.options[0].answer = e.target.value;
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
					message: interviewResultMessage.cancel,
					link: '/home/interviews',
				},
				replace: true,
			});
		}

		const checkRequired = checkRequeredField(interview.questions);

		if (!checkRequired) {
			navigate('/info', {
				state: {
					message: interviewResultMessage.save,
					link: '/home/interviews',
				},
				replace: true,
			});

			updateDataInLS('answers', {
				id: currentUser.id,
				interviews: [interview],
			});
		} else {
			getNotification.failed(infoMessage.requiredField);
		}
	});

	useEffect(() => {
		if (interview !== null) {
			const questionPercent = Math.floor(100 / interview.questions.length);

			const selectedQuestions = interview.questions.filter((question) =>
				question.options.find((option) => option.checked === true)
			);

			const currentPercent = selectedQuestions.length * questionPercent;

			setPercent(currentPercent);
		}
	}, [interview]);

	useEffect(() => {
		const dataFromLS = getFromLSByKey('interviews');
		const interviewData = dataFromLS.find((item) => item.id === interviewId);

		if (interviewData.queries.randomQuestionOrder) {
			shuffleArray(interviewData.questions);
		}

		setInterview(interviewData);
	}, []);

	return (
		<section className="content_center">
			{interview === null ? (
				<Loader />
			) : (
				<>
					<div className="btn_group">
						<SaveCancelActionBtns
							handleSaveEditing={() => handleSaveCancelAnswers('save')}
							handleCancelEditing={() => handleSaveCancelAnswers('cancel')}
						/>
					</div>
					<div className="content__head_center">
						<h2 className="title_s">Опрос: {interview.title}</h2>
					</div>

					<div className="content__body_center">
						{interview.questions.map((question, index) => (
							<div className="content__body_item_center" key={question.id}>
								{interview.queries.requiredFields && question.required && (
									<PrimaryDropDown
										trigger={<BsAsterisk className="icon_red icon_s" />}
									>
										<span className="p_primary">Обязательный вопрос</span>
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
													placeholder="Введите ваш ответ..."
													defaultValue={option.answer}
													handleBlur={(e) => handleTextAnswer(e, question.id)}
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
				</>
			)}
		</section>
	);
};