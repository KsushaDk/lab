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

export const admin = {
	username: 'admin',
	email: 'admin@gmail.com',
	password: '00000000',
};
