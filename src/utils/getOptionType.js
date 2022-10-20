import { Option } from '../constants/OptionType';

export const getOptionType = (type) => {
	let optionType = 0;

	switch (type) {
		case 'text':
			optionType = Option.Text;
			break;

		case 'checkbox':
			optionType = Option.Checkbox;
			break;

		case 'radio':
			optionType = Option.Radio;
			break;

		default:
			optionType = Option.Checkbox;
	}
	return optionType;
};
