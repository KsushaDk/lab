import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const validateInterviewState = (interview) => {
	const checkUniqueTitle = getFromLSByKey('interviews').find(
		(item) => item.title === interview.title
	);

	if (checkUniqueTitle) {
		return 'interviewTitleNotUnique';
	}

	if (interview.title === '') {
		return 'enterInterviewTitle';
	}

	if (
		interview.questions.length === 0 ||
		interview.questions[0]?.question === ''
	) {
		return 'addAtLeastOne';
	}

	return 'saveInterview';
};
