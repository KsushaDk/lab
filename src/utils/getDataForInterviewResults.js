import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getDataForInterviewResults = (interviewId) => {
	const dataFromLS = getFromLSByKey('answers');
	const interviewData = dataFromLS
		.map((answer) =>
			answer.interviews.filter((interview) => interview.id === interviewId)
		)
		.filter((item) => item.length > 0)
		.flat(Infinity);

	const allQuestions = interviewData
		.map((item) => item.questions.map((question) => question))
		.flat(Infinity);

	return {
		total: interviewData.length,
		id: interviewData[0].id,
		title: interviewData[0].title,
		questions: interviewData[0].questions,
		allQuestions,
	};
};
