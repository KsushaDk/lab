import React from 'react';
import { btnValues } from 'Constants/constants';
import { PrimaryBtn } from '../ui/button/PrimaryBtn/PrimaryBtn';
import './Sidebar.scss';

const Sidebar = () => (
	<section className="sidebar">
		{btnValues.map((btnValue) => (
			<PrimaryBtn key={btnValue.link} btnValue={btnValue} />
		))}
	</section>
);

export default Sidebar;
