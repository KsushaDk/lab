import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	// BsFileEarmarkFill,
	BsListOl,
	BsListUl,
	BsTextareaT,
	// BsStar,
	// BsBatteryHalf,
} from 'react-icons/bs';

export const labels = [
	'О нас',
	'Обучение',
	'Бенефиты',
	'Для студентов',
	'Наши преимущества',
	'Вакансии',
	'Контакты',
];

export const btnValues = [
	{ value: 'Новый опрос', link: 'create' },
	{ value: 'Мои опросы', link: 'interviews' },
	{ value: 'Шаблоны опросов', link: 'templates' },
	{ value: 'Пользователи', link: 'users' },
];

export const dammyText =
	'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, excepturi deleniti, ducimus debitis aliquid sit magnam enim atque tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quo, nulla, sequi magni eaque a, velit perferendis illo cum repellat voluptas impedit cupiditate vel expedita labore minus voluptatibus tenetur odit.';

export const errMessages = {
	minLength: {
		username: 'Name must have at least 4 characters',
		password: 'Password must have at least 8 characters',
	},
	maxLength: {
		username: 'Name must have less than 20 characters',
		password: 'Password must have less than 15 characters',
	},
	notEmptyField: 'The field can not be empty',
	emailErr: 'Invalid email',
	emailUniqueErr: 'This email already exists',
	passErr:
		'Password must have a number, a special character and lowercase/uppercase letters',
	notMatchPass: 'The passwords do not match',
	incorrectEmail: 'Email is incorrect',
	incorrectPass: 'Check your email or password',
};

export const interviewResultMessage = {
	save: 'Поздравляем, Ваши ответы сохранены! Если Вам интересно пройти другие тесты, кликайте',
	cancel:
		'Ваши ответы удалены. Если Вам интересно пройти другие тесты, кликайте',
};

export const infoMessage = {
	requiredField: 'Все обязательные поля должны быть заполнены',
	notEmptyField: 'Упс, поле не может быть пустым',
};

export const regEmail =
	/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@(gmail|yahoo)+(\.com)$/gm;
export const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

export const columnsUsers = [
	{ field: 'username', fieldName: 'Имя' },
	{ field: 'role', fieldName: 'Роль' },
	{ field: 'registered', fieldName: 'Зарегистрирован' },
	{ field: 'interviews', fieldName: 'Опросы' },
	{ field: 'actions', fieldName: 'Действия' },
];

export const dataUsers = [
	{
		id: uuidv4(),
		username: 'Админ',
		email: 'admin@gmail.com',
		password: 'Admin1234!',
		role: 'Администратор',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 10,
	},
	{
		id: uuidv4(),
		username: 'Юзер1',
		email: 'user1@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 5,
	},
	{
		id: uuidv4(),
		username: 'Юзер2',
		email: 'user2@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 1,
	},
	{
		id: uuidv4(),
		username: 'Юзер3',
		email: 'user3@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 7,
	},
	{
		id: uuidv4(),
		username: 'Юзер4',
		email: 'user4@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 4,
	},
	{
		id: uuidv4(),
		username: 'Юзер5',
		email: 'user5@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 13,
	},
	{
		id: uuidv4(),
		username: 'Юзер6',
		email: 'user6@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 13,
	},
	{
		id: uuidv4(),
		username: 'Юзер7',
		email: 'user7@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 13,
	},
	{
		id: uuidv4(),
		username: 'Юзер8',
		email: 'user8@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 13,
	},
	{
		id: uuidv4(),
		username: 'Юзер9',
		email: 'user9@gmail.com',
		password: 'User1234!',
		role: 'Пользователь',
		registered: new Date(Date.now()).toLocaleDateString(),
		interviews: 13,
	},
];

export const columnsInterviews = [
	{ field: 'title', fieldName: 'Название' },
	{ field: 'changed', fieldName: 'Изменен' },
	{ field: 'answers', fieldName: 'Ответы' },
	{ field: 'link', fieldName: 'Ссылка' },
	{ field: 'results', fieldName: 'Результаты' },
	{ field: 'actions', fieldName: 'Действия' },
];

export const dataInterviews = [
	{
		id: uuidv4(),
		title: 'Опрос 1',
		changed: new Date(Date.now()).toLocaleDateString(),
		answers: 10,
		link: 'www.blabla.com',
		results: 'результаты',
	},
	{
		id: uuidv4(),
		title: 'Опрос 2',
		changed: new Date(Date.now()).toLocaleDateString(),
		answers: 14,
		link: 'www.blabla.com',
		results: 'результаты',
	},
	{
		id: uuidv4(),
		title: 'Опрос 3',
		changed: new Date(Date.now()).toLocaleDateString(),
		answers: 3,
		link: 'www.blabla.com',
		results: 'результаты',
	},
];

export const dataTemplates = [
	{
		id: 1,
		title: 'Шаблон 1',
		questions: 10,
		pages: 1,
	},
	{
		id: 2,
		title: 'Шаблон 2',
		questions: 22,
		pages: 3,
	},
	{
		id: 3,
		title: 'Шаблон 3',
		questions: 40,
		pages: 4,
	},
	{
		id: 4,
		title: 'Шаблон 4',
		questions: 15,
		pages: 2,
	},
];

export const questionTypeList = [
	{
		id: uuidv4(),
		title: 'Варианты ответа (один)',
		type: 'radio',
		icon: <BsListUl className="icon_black icon_l" />,
	},
	{
		id: uuidv4(),
		title: 'Варианты ответа (несколько)',
		type: 'checkbox',
		icon: <BsListOl className="icon_black icon_l" />,
	},
	{
		id: uuidv4(),
		title: 'Текст',
		type: 'text',
		icon: <BsTextareaT className="icon_black icon_l" />,
	},
	// {
	// 	id: uuidv4(),
	// 	title: 'Файл',
	// 	type: 'file',
	// 	icon: <BsFileEarmarkFill className="icon_black icon_l" />,
	// },
	// {
	// 	id: uuidv4(),
	// 	title: 'Рейтинг в звездах',
	// 	type: 'rating',
	// 	icon: <BsStar className="icon_black icon_l" />,
	// },
	// {
	// 	id: uuidv4(),
	// 	title: 'Шкала',
	// 	type: 'scale',
	// 	icon: <BsBatteryHalf className="icon_black icon_l" />,
	// },
];

export const successNotification = {
	position: 'bottom-left',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const failedNotification = {
	position: 'bottom-left',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const infoNotification = {
	position: 'bottom-left',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const interviewQuery = [
	{
		id: uuidv4(),
		key: 'anonymousInterview',
		title: 'Анонимный опрос',
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'questionNum',
		title: 'Номера вопросов',
		checked: false,
	},
	// {
	// 	id: uuidv4(),
	// key: 'pageNum',
	// 	title: 'Номера страниц',
	// 	checked: false,
	// },
	{
		id: uuidv4(),
		key: 'randomQuestionOrder',
		title: 'Случайный порядок вопросов',
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'requiredFields',
		title: 'Звездочки обязательных полей',
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'progressBar',
		title: 'Индикатор выполнения',
		checked: false,
	},
];

export const questionCheckboxExample = {
	id: uuidv4(),
	question:
		'Кто из знаменитых художников стал знаменитым сразу после своей смерти?',
	options: [
		{
			id: uuidv4(),
			title: 'Пьер Огюст Ренуар',
			checked: false,
			correct: false,
		},
		{
			id: uuidv4(),
			title: 'Винсент Ван Гог',
			checked: true,
			correct: true,
		},
		{
			id: uuidv4(),
			title: 'Рембрандт',
			checked: false,
			correct: false,
		},
		{ id: uuidv4(), title: 'Поль Гоген', checked: true, correct: true },
	],
};

export const questionRadioExample = {
	id: uuidv4(),
	question:
		'Ученик элитной школы обнаруживает свое родство с маньяком-убийцей и помогает ему бежать от правосудия',
	options: [
		{
			id: uuidv4(),
			title: 'Гарри Поттер и Узник Азкабана',
			checked: true,
			correct: true,
		},
		{
			id: uuidv4(),
			title: 'Общество мертвых поэтов',
			checked: false,
			correct: false,
		},
		{
			id: uuidv4(),
			title: 'Легкое дыхание',
			checked: false,
			correct: false,
		},
		{ id: uuidv4(), title: 'Матрица', checked: false, correct: false },
	],
};

export const questionTextExample = {
	id: uuidv4(),
	question:
		'Вы находитесь в самолете. Перед вами лошадь, сзади вас - автомобиль. Где вы находитесь?',
	options: [
		{
			id: uuidv4(),
			title: 'На карусели',
			checked: true,
			correct: true,
		},
	],
};

export const DragDropItem = {
	QUESTION: 'question',
};
