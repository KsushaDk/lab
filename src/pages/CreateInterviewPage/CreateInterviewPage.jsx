import React, { useState, useEffect } from 'react';
import { ImBin } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { SecondaryBtn } from 'Components/ui/button/SecondaryBtn/SecondaryBtn';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { IconBtn } from 'Components/ui/button/IconBtn/IconBtn';
import { Loader } from 'Components/Loader/Loader';
import { interviewQuery, questionTypeList } from 'Constants/constants';
import { getQuestionToRender } from 'Constants/QuestionType';
import { getNotification } from 'Utils/getNotification';
import { getQuestionType } from 'Utils/getQuestionType';
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
		setInterview({
			id: uuidv4(),
			name: '',
			questions: [],
		});

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
				{
					id: uuidv4(),
					type: e.target.getAttribute('name'),
				},
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
		setInterview({
			id: uuidv4(),
			name: '',
			questions: [],
		});
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
						<SecondaryBtn
							btnValue="Сохранить"
							handleClick={handleSaveInterview}
						/>
						<SecondaryBtn
							btnValue="Отмена"
							handleClick={handleRemoveInterview}
						/>
					</div>
					<div className="content__body">
						<div className="content__body_left">
							{interview?.questions.length !== 0 && (
								<div className="content__body_items">
									<IconBtn
										handleClick={() => handleRemoveInterview()}
										btnIcon={<ImBin />}
									/>
									{interview?.questions.map(
										(question) =>
											getQuestionToRender(question, handleRemoveQuestion)[
												getQuestionType(question.type)
											]
									)}
								</div>
							)}
						</div>

						<aside className="content__body_right">
							<div className="interview__settings">
								<h3 className="title_xs">Тип вопроса</h3>
								<ul
									className="settings__list"
									onClick={handleAddQuestion}
									role="menu"
								>
									{questionTypeList.map((questionType) => (
										<li
											className="settings__list_option"
											name={questionType.type}
											key={questionType.id}
										>
											{questionType.icon} {questionType.title}
										</li>
									))}
								</ul>
							</div>
							<div className="interview__settings">
								<h3 className="title_xs">Параметры опроса</h3>
								<ul className="settings__list" role="menu">
									{queryForInterview.map((query) => (
										<li
											className="settings__list_option"
											key={query.id}
											id={query.id}
											onClick={handleChangeQuery}
											role="menuitem"
										>
											<CheckboxInput option={query} />
										</li>
									))}
								</ul>
							</div>
						</aside>
					</div>
				</>
			)}
		</section>
	);
};
