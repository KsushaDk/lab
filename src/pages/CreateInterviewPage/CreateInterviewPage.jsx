import React, { useState, useEffect } from 'react';
import {
	BsFileEarmarkFill,
	BsListOl,
	BsListUl,
	BsTextareaT,
	BsStar,
	BsBatteryHalf,
} from 'react-icons/bs';
import { CustomSelect } from 'Components/ui/select/CustomSelect/CustomSelect';
import { Loader } from 'Components/Loader/Loader';
import { PrimaryBtn } from 'Components/ui/button/PrimaryBtn/PrimaryBtn';
import { InterviewInfo } from 'Components/InterviewInfo/InterviewInfo';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { CheckboxQuestion } from 'Components/Questions/CheckboxQuestion';
import { useFetch } from 'Hooks/useFetch';
import { interviewQuery, questionCheckbox } from 'Utils/constants';
import { removeItemByQuery } from 'Utils/removeItemByQuery';
import './CreateInterviewPage.scss';

export const CreateInterviewPage = () => {
	const { data, loading, error } = useFetch(
		'https://jsonplaceholder.typicode.com/todos'
	);

	const [queryForInterview, setQueryForInterview] = useState([]);
	const [selectedQueryID, setSelectedQueryID] = useState([]);
	const [questionType, setQuestionType] = useState('checkbox');

	const handleCheckboxQuery = (e) => {
		if (selectedQueryID.includes(e.target.id)) {
			const newSelectedQuery = removeItemByQuery(
				queryForInterview,
				e.target.id
			);
			setQueryForInterview(newSelectedQuery);
		} else {
			const selectedQuery = interviewQuery.find(
				(query) => query.id === e.target.id
			);
			setQueryForInterview([...queryForInterview, selectedQuery]);
		}
	};

	const handleCheckboxQuestion = (e) => {
		console.log('answer', e);
	};

	const handleQuestionType = (e) => {
		setQuestionType(e.target.getAttribute('name'));
	};

	useEffect(() => {
		const selectedId = queryForInterview.map((query) => query.id);
		setSelectedQueryID(selectedId);
	}, [queryForInterview]);

	return (
		<section className="content">
			{error && <h2 className="enter_error">{error}</h2>}
			{loading ? (
				<Loader />
			) : (
				<>
					<CustomSelect data={data} multi={false} />
					<CustomSelect data={data} multi />
				</>
			)}
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
						<PrimaryBtn btnValue={{ value: 'Новая страница', link: '#' }} />
					</div>

					<div className="content__body_items">
						{questionType === 'checkbox' && (
							<CheckboxQuestion
								questionId={questionCheckbox[0].id}
								title={questionCheckbox[0].title}
								options={questionCheckbox[0].options}
								handleCheckboxQuestion={handleCheckboxQuestion}
							/>
						)}
						<hr className="horizontal_gray-line" />
						{questionType === 'checkbox' && (
							<CheckboxQuestion
								questionId={questionCheckbox[1].id}
								title={questionCheckbox[1].title}
								options={questionCheckbox[1].options}
								handleCheckboxQuestion={handleCheckboxQuestion}
							/>
						)}
						<hr className="horizontal_gray-line" />
					</div>
				</div>

				<aside className="content__body_right">
					<div className="interview__settings">
						<h3 className="title_xs">Тип вопроса</h3>
						<ul
							className="settings__list"
							onClick={(e) => handleQuestionType(e)}
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
						<ul className="settings__list">
							{interviewQuery.map((query) => (
								<li className="settings__list_option" key={query.id}>
									<CheckboxInput
										option={query}
										handleCheckbox={handleCheckboxQuery}
										selectedID={selectedQueryID}
									/>
								</li>
							))}
						</ul>
					</div>
				</aside>
			</div>
		</section>
	);
};
