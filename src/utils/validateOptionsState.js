import { getNotification } from 'Utils/getNotification';
import { infoMessage } from 'Constants/constants';

export const validateOptionsState = (options, notification) => {
	const checkCorrectAnswers = options.some((option) => option.correct === true);
	!checkCorrectAnswers && getNotification.failed(notification);

	const checkEmptyFields = options.some((option) => option.title === '');
	checkEmptyFields && getNotification.failed(infoMessage.fillEmptyField);

	return !!(checkCorrectAnswers && !checkEmptyFields);
};
