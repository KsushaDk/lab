import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { RadioInput } from 'Components/ui/input/RadioInput/RadioInput';
import { PrimaryOutput } from 'Components/ui/output/PrimaryOutput/PrimaryOutput';

export const getAnswerFieldType = (type, option) => {
	switch (type) {
		case 'radio':
			return <RadioInput option={option} />;

		case 'checkbox':
			return <CheckboxInput option={option} />;

		case 'text':
			return (
				<>
					<BsCheck className="icon_black" />
					<PrimaryOutput option={option} />
				</>
			);

		default:
			null;
	}
};
