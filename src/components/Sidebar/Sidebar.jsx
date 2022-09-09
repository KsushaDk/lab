import React from 'react';
import { btnValues } from 'Utils/constants';
import { PrimaryBtn } from '../ui/button/PrimaryBtn/PrimaryBtn';
import './Sidebar.scss';

export const Sidebar = () => (
	<section className="sidebar">
		{btnValues.map((btnValue) => (
			<PrimaryBtn key={btnValue.link} btnValue={btnValue} />
		))}
	</section>
);
