import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getQuantityForTableCell = (id, keyLS) => {
	const dataFromLS = getFromLSByKey(keyLS).filter((item) =>
		keyLS === 'answers' ? item.id === id : item.author === id
	);
	return dataFromLS.length;
};
