import { findInArrByID } from './findInArrByID';

export const setToLSByKey = (key, data) =>
	localStorage.setItem(key, JSON.stringify(data));

export const getFromLSByKey = (key) => JSON.parse(localStorage.getItem(key));

export const updateDataInLS = (key, newItem) => {
	const dataFromLS = getFromLSByKey(key);

	if (dataFromLS !== null) {
		const checkItem = findInArrByID(dataFromLS, newItem.id);

		if (!checkItem) {
			setToLSByKey(key, [...dataFromLS, newItem]);
		} else {
			const updatedData = dataFromLS.map((item) => {
				if (item.id.toString() === newItem.id.toString()) {
					return key === 'interviews'
						? newItem
						: {
								id: item.id,
								interviews: [...item.interviews, ...newItem.interviews],
						  };
				}
				return item;
			});
			setToLSByKey(key, updatedData);
		}
	} else {
		setToLSByKey(key, [newItem]);
	}
};
