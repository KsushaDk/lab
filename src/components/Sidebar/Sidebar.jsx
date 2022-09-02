import React from 'react';
import { btnValues } from 'Utils/constants';
import { NavBtn } from '../ui/button/NavBtn';
import './Sidebar.scss';

export const Sidebar = () => (
	<div className="main__sidebar">
		{btnValues.map((btnValue) => (
			<NavBtn key={btnValue.link} btnValue={btnValue} />
		))}
	</div>
);
