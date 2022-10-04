import React, { useState } from 'react';
import {
	BsFileEarmarkFill,
	BsListOl,
	BsListUl,
	BsTextareaT,
	BsStar,
	BsBatteryHalf,
} from 'react-icons/bs';
import { ImBin } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { IconBtn } from 'Components/ui/button/IconBtn/IconBtn';
import { interviewQuery } from 'Constants/constants';
import { getQuestionToRender } from 'Constants/QuestionType';
import { getNotification } from 'Utils/getNotification';
import { getQuestionType } from 'Utils/getQuestionType';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { removeFromArrByID } from 'Utils/removeFromArrByID';
import './CreateInterviewPage.scss';

export const CreateInterviewPage = () => {
	const [queryForInterview, setQueryForInterview] = useState(interviewQuery);
	const [questions, setQuestions] = useState([]);

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
		setQuestions([]);
		getNotification.success('Опрос удален!');
	};

	const handleAddQuestion = (e) => {
		setQuestions([
			{
				id: uuidv4(),
				type: e.target.getAttribute('name'),
			},
			...questions,
		]);
	};

	const handleRemoveQuestion = (id) => {
		const newQuestions = removeFromArrByID(questions, id);
		setQuestions(newQuestions);
	};

	return (
		<section className="content">
			<div className="content__head">
				<h2 className="title_m">Новый опрос</h2>
				<input className="content__head_input" placeholder="Опрос номер..." />
			</div>
			<InterviewInfo pages={1} questions={5} />

			<div className="content__body">
				<div className="content__body_left">
					<div className="btn_group">
						<PrimaryBtn btnValue={{ value: 'Сохранить', link: '#' }} />
						<PrimaryBtn btnValue={{ value: 'Отмена', link: '#' }} />
						{/* <PrimaryBtn btnValue={{ value: 'Новая страница', link: '#' }} /> */}
					</div>

					{questions.length !== 0 && (
						<div className="content__body_items">
							<IconBtn
								handleClick={() => handleRemoveInterview()}
								btnIcon={<ImBin />}
							/>
							{questions.map(
								(question) =>
									getQuestionToRender(question, handleRemoveQuestion)[
										getQuestionType(question.type)
									]
							)}

							{/* <hr className="horizontal_gray-line" /> */}
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
							<li className="settings__list_option" name="radio">
								<BsListUl className="icon_black" /> Варианты ответа (один)
							</li>
							<li className="settings__list_option" name="checkbox">
								<BsListOl className="icon_black" /> Варианты ответа (несколько)
							</li>
							<li className="settings__list_option" name="text">
								<BsTextareaT className="icon_black" /> Текст
							</li>
							<li className="settings__list_option" name="file">
								<BsFileEarmarkFill className="icon_black" /> Файл
							</li>
							<li className="settings__list_option" name="rating">
								<BsStar className="icon_black" /> Рейтинг в звездах
							</li>
							<li className="settings__list_option" name="scale">
								<BsBatteryHalf className="icon_black" /> Шкала
							</li>
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
		</section>
	);
};
