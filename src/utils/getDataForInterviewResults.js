import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getDataForInterviewResults = (interviewId) => {
	const dataFromLS = getFromLSByKey('answers');

	const currentInterviewData = dataFromLS.filter(
		(answer) => answer.id === interviewId
	);

	if (currentInterviewData.length > 0) {
		const allQuestions = currentInterviewData
			.map((item) =>
				item.questions.map((question) => ({ userId: item.userId, ...question }))
			)
			.flat(Infinity);

		const dataForSelect = currentInterviewData[0].questions.map((question) => ({
			...question,
			checked: true,
			title: question.question,
		}));

		return {
			total: currentInterviewData.length,
			id: currentInterviewData[0].id,
			title: currentInterviewData[0].title,
			questions: dataForSelect,
			allQuestions,
		};
	}
	return null;
};
