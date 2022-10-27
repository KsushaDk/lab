import { getNotification } from 'Utils/getNotification';

export const validateOptionsState = (options, notification, notEmpty) => {
	const checkCorrectAnswers = options.some((option) => option.correct === true);
	!checkCorrectAnswers && getNotification.failed(notification);

	const checkEmptyFields = options.some((option) => option.title === '');
	checkEmptyFields && getNotification.failed(notEmpty);

	return !!(checkCorrectAnswers && !checkEmptyFields);
};
