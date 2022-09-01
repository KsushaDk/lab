import React from 'react';
import { NavBtn } from '../ui/button/NavBtn';
import { btnValues } from '../../utils/constants';
import './Sidebar.scss';

export const Sidebar = React.memo(() => (
	<div className="main__sidebar">
		{btnValues.map((btnValue) => (
			<NavBtn key={btnValue.link} btnValue={btnValue} />
		))}
	</div>
));
