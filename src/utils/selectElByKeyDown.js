import { getNextElemInArr } from 'Utils/getNextElemInArr';

export const selectElByKeyDown = (e, selectCb, elArr) => {
	if (e.key === 'Enter') {
		selectCb(e);
	} else {
		const nextEl = getNextElemInArr(
			elArr,
			e.key,
			e.currentTarget.getAttribute('index')
		);
		nextEl.focus();
	}
};
