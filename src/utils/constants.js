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
	// passErr: 'Password must have a number and a special character',
	notMatchPass: 'The passwords do not match',
	incorrectEmail: 'Email is incorrect',
	incorrectPass: 'Password is incorrect',
};

export const regEmail =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const admin = {
	username: 'admin',
	email: 'admin@gmail.com',
	password: '00000000',
};
