import React, { useState, useEffect } from 'react';
import { InterviewQueryList } from 'Components/InterviewQueryList/InterviewQueryList';
import { InterviewQuestionList } from 'Components/InterviewQuestionList/InterviewQuestionList';
import { SaveCancelActionBtns } from 'Components/ActionItems/SaveCancelActionBtns';
import { QuestionTypeList } from 'Components/QuestionTypeList/QuestionTypeList';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { Loader } from 'Components/Loader/Loader';
import { interviewQuery } from 'Constants/constants';
import { addDefaultValue } from 'Utils/addDefaultValue';
import { getNotification } from 'Utils/getNotification';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import './CreateInterviewPage.scss';

export const CreateInterviewPage = () => {
	const [interview, setInterview] = useState(null);
	const [interviewQueries, setInterviewQueries] = useState(interviewQuery);

	const handleInterviewName = (e) => {
		setInterview({
			...interview,
			name: e.target.value,
		});
	};

	const handleChangeQuery = (e) => {
		const updatedQuery = toggleValueByKey(
			interviewQueries,
			e.currentTarget.id,
			'checked'
		);
		setInterviewQueries(updatedQuery);
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
		localStorage.removeItem(interview.id.toString());
		getNotification.success('Опрос удален!');

		setInterview(addDefaultValue.interview());
	};

	const handleSaveInterview = () => {
		if (interview.name === '') {
			getNotification.failed('Введите название опроса');
		} else {
			localStorage.setItem(
				interview.id.toString(),
				JSON.stringify({ ...interview, queries: interviewQueries })
			);

			getNotification.success('Опрос успешно сохранен!');
		}
	};

	useEffect(() => {
		setInterview(addDefaultValue.interview(interviewQueries));
	}, []);

	return (
		<section className="content">
			{interview === null ? (
				<Loader />
			) : (
				<>
					<div className="content__head">
						<h2 className="title_m">Новый опрос</h2>
						<input
							className="content__head_input"
							placeholder="Опрос номер..."
							value={interview?.name}
							onChange={handleInterviewName}
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
				</>
			)}
		</section>
	);
};
