import React from 'react';
import { RadioInput } from 'Components/ui/input/RadioInput/RadioInput';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { PrimaryOutput } from 'Components/ui/output/PrimaryOutput/PrimaryOutput';

export const Option = Object.freeze({
	Text: 1,
	Checkbox: 2,
	Radio: 3,
	File: 4,
	Scale: 5,
	Rating: 6,
});

export const getOptionToRender = (
	option
) => ({
	[Option.Text]: (
		<PrimaryOutput
			option={option}
		/>
	),
	[Option.Checkbox]: (
		<CheckboxInput
			option={option}
		/>
	),
	[Option.Radio]: (
		<RadioInput
			option={option}
		/>
	),
	[Option.File]: null,
	[Option.Scale]: null,
	[Option.Rating]: null,
});
