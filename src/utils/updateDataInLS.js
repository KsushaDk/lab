import { findInArrByID } from './findInArrByID';
import { getFromLSByKey, setToLSByKey } from './funcForLSByKey';

export const updateDataInLS = (key, newItem) => {
	const dataFromLS = getFromLSByKey(key);

	if (dataFromLS !== null) {
		const checkItem = findInArrByID(dataFromLS, newItem.id);

		if (!checkItem) {
			setToLSByKey(key, [...dataFromLS, newItem]);
		} else {
			const updatedData = dataFromLS.map((item) => {
				if (item.id.toString() === newItem.id.toString()) {
					return newItem;
				}
				return item;
			});

			setToLSByKey(key, updatedData);
		}
	} else {
		setToLSByKey(key, [newItem]);
	}
};
