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
	const [queryForInterview, setQueryForInterview] = useState(interviewQuery);

	const handleInterviewName = (e) => {
		setInterview({
			...interview,
			name: e.target.value,
		});
	};

	const handleChangeQuery = (e) => {
		const updatedQuery = toggleValueByKey(
			queryForInterview,
			e.currentTarget.id,
			'checked'
		);

		setQueryForInterview(updatedQuery);
	};

	const handleRemoveInterview = () => {
		localStorage.clear();
		setInterview(addDefaultValue.interview());

		getNotification.success('Опрос удален!');
	};

	const handleSaveInterview = () => {
		const questionsFromLS = interview.questions.map((question) =>
			JSON.parse(localStorage.getItem(question.id.toString()))
		);

		setInterview({ ...interview, questions: questionsFromLS });

		localStorage.clear();
		getNotification.success('Опрос успешно сохранен!');
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

	useEffect(() => {
		interview !== null &&
			localStorage.setItem(interview.id.toString(), JSON.stringify(interview));
	}, [interview]);

	useEffect(() => {
		setInterview(addDefaultValue.interview());
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
								handleRemoveInterview={handleRemoveInterview}
								handleRemoveQuestion={handleRemoveQuestion}
							/>
						</div>

						<aside className="content__body_right">
							<QuestionTypeList handleAddQuestion={handleAddQuestion} />
							<InterviewQueryList
								queries={queryForInterview}
								handleChangeQuery={handleChangeQuery}
							/>
						</aside>
					</div>
				</>
			)}
		</section>
	);
};
