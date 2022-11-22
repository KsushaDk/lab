import { findInArrByID } from './findInArrByID';

export const setToLSByKey = (key, data) =>
	localStorage.setItem(key, JSON.stringify(data));

export const getFromLSByKey = (key) => JSON.parse(localStorage.getItem(key));

const checkAnswerItem = (data, newItem) =>
	data.find((item) => item.id === newItem.id && item.userId === newItem.userId);

export const updateDataInLS = (key, newItem) => {
	const dataFromLS = getFromLSByKey(key);

	if (dataFromLS !== null) {
		const checkItem =
			key === 'answers'
				? checkAnswerItem(dataFromLS, newItem)
				: findInArrByID(dataFromLS, newItem.id);

		if (!checkItem) {
			setToLSByKey(key, [...dataFromLS, newItem]);
		} else {
			const updatedData =
				key === 'answers'
					? dataFromLS.map((item) =>
							item.id === newItem.id && item.userId === newItem.userId
								? newItem
								: item
					  )
					: dataFromLS.map((item) =>
							item.id.toString() === newItem.id.toString() ? newItem : item
					  );

			setToLSByKey(key, updatedData);
		}
	} else {
		setToLSByKey(key, [newItem]);
	}
};
