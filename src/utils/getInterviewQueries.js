import { interviewQuery } from 'Constants/constants';

export const getInterviewQueries = () =>
	Object.fromEntries(interviewQuery.map((query) => [query.key, query.checked]));
