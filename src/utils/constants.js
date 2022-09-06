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
	'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, excepturi deleniti, ducimus debitis aliquid sit magnam enim atque tempora';

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
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

export const columnsUsers = [
	{ field: 'username', fieldName: 'Имя' },
	{ field: 'role', fieldName: 'Роль' },
	{ field: 'date', fieldName: 'Зарегистрирован' },
	{ field: 'interviews', fieldName: 'Опросы' },
	{ field: 'actions', fieldName: 'Действия' },
];

export const dataUsers = [
	{
		id: 1,
		username: 'Админ',
		role: 'Администратор',
		date: '01.01.2020',
		interviews: 10,
	},
	{
		id: 2,
		username: 'Юзер1',
		role: 'Пользователь',
		date: '02.01.2021',
		interviews: 5,
	},
	{
		id: 3,
		username: 'Юзер2',
		role: 'Пользователь',
		date: '03.01.2021',
		interviews: 1,
	},
	{
		id: 4,
		username: 'Юзер3',
		role: 'Пользователь',
		date: '04.01.2022',
		interviews: 7,
	},
	{
		id: 5,
		username: 'Юзер4',
		role: 'Пользователь',
		date: '05.01.2022',
		interviews: 4,
	},
	{
		id: 6,
		username: 'Юзер5',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 7,
		username: 'Юзер6',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 8,
		username: 'Юзер7',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 9,
		username: 'Юзер8',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 10,
		username: 'Юзер9',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 11,
		username: 'Юзер10',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 12,
		username: 'Юзер11',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 13,
		username: 'Юзер12',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 14,
		username: 'Юзер13',
		role: 'Пользователь',
		date: '06.01.2022',
		interviews: 13,
	},
	{
		id: 15,
		username: 'Юзер14',
		role: 'Пользователь',
		date: '06.01.2022',
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
		id: 1,
		title: 'Опрос 1',
		changed: '01.01.2020',
		answers: 10,
		link: 'www.blabla.com',
		results: 'результаты',
	},
	{
		id: 2,
		title: 'Опрос 2',
		changed: '02.01.2020',
		answers: 14,
		link: 'www.blabla.com',
		results: 'результаты',
	},
	{
		id: 3,
		title: 'Опрос 3',
		changed: '03.01.2020',
		answers: 3,
		link: 'www.blabla.com',
		results: 'результаты',
	},
];
