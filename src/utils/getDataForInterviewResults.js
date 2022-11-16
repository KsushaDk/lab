import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { findInArrByID } from './findInArrByID';

export const getDataForInterviewResults = (interviewId) => {
	const interviewFromLS = findInArrByID(
		getFromLSByKey('interviews'),
		interviewId
	);
	const dataFromLS = getFromLSByKey('answers');

	if (dataFromLS) {
		const currentInterviewData = dataFromLS.filter(
			(answer) => answer.id === interviewId
		);

		if (currentInterviewData.length > 0) {
			const allQuestions = currentInterviewData
				.map((item) =>
					item.questions.map((question) => ({
						userId: item.userId,
						...question,
					}))
				)
				.flat(Infinity);

			const dataForSelect = currentInterviewData[0].questions.map(
				(question) => ({
					...question,
					checked: true,
					title: question.question,
				})
			);

			return {
				total: currentInterviewData.length,
				id: currentInterviewData[0].id,
				title: interviewFromLS.title,
				questions: dataForSelect,
				allQuestions,
			};
		}
	}
	return null;
};
