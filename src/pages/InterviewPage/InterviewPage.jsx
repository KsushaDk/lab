import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsAsterisk } from 'react-icons/bs';
import { SecondaryInput } from 'Components/ui/input/SecondaryInput/SecondaryInput';
import { PrimaryDropDown } from 'Components/ui/dropdown/PrimaryDropDown';
import { ProgressBar } from 'Components/ui/progressbar/ProgressBar';
import { Loader } from 'Components/Loader/Loader';
import { getOptionToRender } from 'Constants/OptionType';
import { toggleOptionClick } from 'Utils/toggleOptionClick';
import { getNotification } from 'Utils/getNotification';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { getOptionType } from 'Utils/getOptionType';
import { shuffleArray } from 'Utils/shuffleArray';

import './InterviewPage.scss';

export const InterviewPage = () => {
	const [interview, setInterview] = useState(null);
	const [percent, setPercent] = useState(1);

	const { interviewId } = useParams();

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
			return getNotification.failed('Упс, поле не может быть пустым');
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
										<div className="p_primary">Обязательный вопрос.</div>
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
