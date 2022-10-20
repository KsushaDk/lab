import { toggleValueByKey } from 'Utils/toggleValueByKey';

export const toggleOptionClick = (options, optionId, type, key) => {
	let newOptions = [];
	switch (type) {
		case 'radio':
			newOptions = options.map((option) => {
				if (option.id.toString() === optionId.toString()) {
					option[key] = !option[key];
				} else {
					option[key] = false;
				}
				return option;
			});
			break;

		case 'checkbox':
			newOptions = toggleValueByKey(options, optionId, key);
			break;

		default:
		// do nothing
	}

	return newOptions;
};
