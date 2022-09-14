import { useSelector } from 'react-redux';

export function useInterviews() {
	const interviews = useSelector((state) => state.interviews);

	return interviews;
}
