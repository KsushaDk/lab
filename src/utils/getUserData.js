import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getUserData = () => {
	const users = getFromLSByKey('users');
	const currentUser = users?.find((user) => user.isAuth === true);

	return { users, currentUser };
};
