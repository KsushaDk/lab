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

export const lngs = {
	en: { nativeName: 'English' },
	ru: { nativeName: 'Russian' },
};

export const labels = [
	'aboutUs',
	'studying',
	'benefits',
	'forStudents',
	'advantages',
	'jobs',
	'contacts',
];

export const btnValues = [
	{ key: 'newInterview', link: 'create' },
	{ key: 'myInterviews', link: 'interviews' },
	{ key: 'interviewTemplates', link: 'templates' },
	{ key: 'users', link: 'users' },
];

export const dammyText =
	'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, excepturi deleniti, ducimus debitis aliquid sit magnam enim atque tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quo, nulla, sequi magni eaque a, velit perferendis illo cum repellat voluptas impedit cupiditate vel expedita labore minus voluptatibus tenetur odit.';

export const regEmail =
	/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@(gmail|yahoo)+(\.com)$/gm;
export const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

export const columnsUsers = [
	{ key: 'username' },
	{ key: 'role' },
	{ key: 'registered' },
	{ key: 'interviews' },
	{ key: 'actions' },
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
	{ key: 'title' },
	{ key: 'changed' },
	{ key: 'answers' },
	{ key: 'link' },
	{ key: 'results' },
	{ key: 'actions' },
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
		key: 'singleQuestion',
		type: 'radio',
		icon: <BsListUl className="icon_black icon_l" />,
	},
	{
		id: uuidv4(),
		key: 'multiQuestion',
		type: 'checkbox',
		icon: <BsListOl className="icon_black icon_l" />,
	},
	{
		id: uuidv4(),
		key: 'textQuestion',
		type: 'text',
		icon: <BsTextareaT className="icon_black icon_l" />,
	},
	// {
	// 	id: uuidv4(),
	// key: 'fileQuestion',
	// 	type: 'file',
	// 	icon: <BsFileEarmarkFill className="icon_black icon_l" />,
	// },
	// {
	// 	id: uuidv4(),
	// key: 'ratingQuestion',
	// 	type: 'rating',
	// 	icon: <BsStar className="icon_black icon_l" />,
	// },
	// {
	// 	id: uuidv4(),
	// key: 'scaleQuestion',
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
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'questionNum',
		checked: false,
	},
	// {
	// 	id: uuidv4(),
	// key: 'pageNum',
	// 	checked: false,
	// },
	{
		id: uuidv4(),
		key: 'randomQuestionOrder',
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'requiredFields',
		checked: false,
	},
	{
		id: uuidv4(),
		key: 'progressBar',
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

export const barOptions = {
	indexAxis: 'y',
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
			// position: 'top',
			// color: 'black',
			// font: {
			// 	family: 'IBM Plex Sans Condensed',
			// 	size: 20,
			// 	weight: 500,
			// },
			// padding: { bottom: 20 },
			// align: 'start',
			// text: question.question,
		},
	},
	scales: {
		x: {
			min: 0,
			max: 100,
			ticks: {
				callback(value) {
					return `${value}%`;
				},
				color: 'rgba(152, 152, 152, 0.91)',
			},
		},
		y: {
			ticks: {
				color: '#101010',
				font: {
					family: 'IBM Plex Sans Condensed',
					size: 16,
					weight: 500,
				},
			},
		},
	},
};
