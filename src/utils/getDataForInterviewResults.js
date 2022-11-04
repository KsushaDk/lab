import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getDataForInterviewResults = (interviewId) => {
	const dataFromLS = getFromLSByKey('answers');

	const interviewData = dataFromLS
		.map((answer) =>
			answer.interviews.filter((interview) => interview.id === interviewId)
		)
		.filter((item) => item.length > 0)
		.flat(Infinity);

	if (interviewData.length > 0) {
		const allQuestions = interviewData
			.map((item) =>
				item.questions.map((question) => ({ userId: item.userId, ...question }))
			)
			.flat(Infinity);

		const dataForSelect = interviewData[0].questions.map((question) => ({
			...question,
			checked: true,
			title: question.question,
		}));

		return {
			total: interviewData.length,
			id: interviewData[0].id,
			title: interviewData[0].title,
			questions: dataForSelect,
			allQuestions,
		};
	}
	return null;
};
