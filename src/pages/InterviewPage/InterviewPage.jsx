import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsAsterisk } from 'react-icons/bs';
import { Loader } from 'Components/Loader/Loader';
import { getOptionToRender } from 'Constants/OptionType';
import { toggleOptionClick } from 'Utils/toggleOptionClick';
import { getOptionType } from 'Utils/getOptionType';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
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
									<BsAsterisk className="icon_red icon_s" />
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
											{getOptionToRender(option)[getOptionType(question.type)]}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="progress-bar__wrapper">
						<div className="progress-bar__state">
							{Math.floor((interview.questions.length * percent) / 100)}
							&#47;{interview.questions.length}
						</div>

						<div className="progress-bar-unfill">
							<span
								className="progress-bar-fill"
								style={{ width: `${percent}%` }}
							/>
						</div>
						<div className="progress-bar__state">{percent}%</div>
					</div>
				</>
			)}
		</section>
	);
};
