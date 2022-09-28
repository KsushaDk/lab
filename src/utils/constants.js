import { v4 as uuidv4 } from 'uuid';

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

export const successNotification = {
	position: 'bottom-right',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const failedNotification = {
	position: 'bottom-right',
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
		title: 'Анонимный опрос',
	},
	{
		id: uuidv4(),
		title: 'Номера вопросов',
	},
	{
		id: uuidv4(),
		title: 'Номера страниц',
	},
	{
		id: uuidv4(),
		title: 'Случайный порядок вопросов',
	},
	{
		id: uuidv4(),
		title: 'Случайный порядок вопросов',
	},
	{
		id: uuidv4(),
		title: 'Звездочки обязательных полей',
	},
	{
		id: uuidv4(),
		title: 'Индикатор выполнения',
	},
];

export const questionCheckbox = [
	{
		id: uuidv4(),
		title:
			'Ученик элитной школы обнаруживает свое родство с маньяком-убийцей и помогает ему бежать от правосудия',
		options: [
			{ id: uuidv4(), title: 'Гарри Поттер и Узник Азкабана' },
			{ id: uuidv4(), title: 'Общество мертвых поэтов' },
			{ id: uuidv4(), title: 'Легкое дыхание' },
			{ id: uuidv4(), title: 'Матрица' },
		],
	},
	{
		id: uuidv4(),
		title:
			'Капризный подросток слишком много жалуется. И у него есть красная кепка.',
		options: [
			{ id: uuidv4(), title: 'Красная шапочка' },
			{ id: uuidv4(), title: 'Над пропастью во ржи' },
			{ id: uuidv4(), title: 'По эту сторону рая' },
			{ id: uuidv4(), title: 'Доктор Живаго' },
		],
	},
	{
		id: uuidv4(),
		title:
			'История о том, почему доверять топор студентам на практике - плохая идея',
		options: [
			{ id: uuidv4(), title: 'Сияние' },
			{ id: uuidv4(), title: 'Братья Карамазовы' },
			{ id: uuidv4(), title: 'Вишневый сад' },
			{ id: uuidv4(), title: 'Преступление и наказание' },
		],
	},
	{
		id: uuidv4(),
		title:
			'Девушка ненавидит богатого аристократа. А нет, погодите, не ненавидит',
		options: [
			{ id: uuidv4(), title: 'Война и мир' },
			{ id: uuidv4(), title: 'Джейн Эйр' },
			{ id: uuidv4(), title: 'Гордость и предубеждение' },
			{ id: uuidv4(), title: 'Евгений Онегин' },
		],
	},
];
