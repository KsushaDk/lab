import { getFromLSByKey } from 'Utils/funcForLSByKey';

export const getQuantityForTableCell = (id, keyLS) => {
	const dataFromLS = getFromLSByKey(keyLS);

	return dataFromLS
		? dataFromLS.filter((item) =>
				keyLS === 'answers' ? item.id === id : item.author === id
		  ).length
		: 0;
};
