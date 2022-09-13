import { useSelector } from 'react-redux';

export function useAuth() {
	const users = useSelector((state) => state.users);

	return users;
}
