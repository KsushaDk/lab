import { toggleValueByKey } from 'Utils/toggleValueByKey';

export const toggleOptionClick = (options, optionId, type, key) => {
	let newOptions = [];
	if (type === 'radio') {
		newOptions = options.map((option) => {
			if (option.id.toString() === optionId.toString()) {
				option[key] = !option[key];
			} else {
				option[key] = false;
			}
			return option;
		});
	} else if (type === 'checkbox') {
		newOptions = toggleValueByKey(options, optionId, key);
	}

	return newOptions;
};
