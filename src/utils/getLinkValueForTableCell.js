import { useTranslation } from 'react-i18next';

export const getLinkValueForTableCell = (key) => {
	const { t } = useTranslation();

	let linkValue = '';
	switch (key) {
		case 'link':
			linkValue = t('infoMessage.interviewLink');
			break;
		case 'results':
			linkValue = t('infoMessage.resultLink');
			break;
		case 'userId':
			linkValue = t('infoMessage.showUserAnswers');
			break;

		default:
			linkValue = 'link';
	}

	return linkValue;
};
