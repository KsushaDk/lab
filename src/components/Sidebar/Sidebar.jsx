import React, { useEffect, useState } from 'react';
import { adminBtnValues, userBtnValues } from 'Constants/constants';
import { getUserData } from 'Utils/getUserData';
import { PrimaryBtn } from '../ui/button/PrimaryBtn/PrimaryBtn';
import './Sidebar.scss';

const Sidebar = () => {
	const [btnValues, setBtnValues] = useState(adminBtnValues);
	const { currentUser } = getUserData();

	useEffect(() => {
		currentUser.role === 'admin'
			? setBtnValues(adminBtnValues)
			: setBtnValues(userBtnValues);
	}, []);

	return (
		<section className="sidebar">
			{btnValues.map((btnValue) => (
				<PrimaryBtn key={btnValue.link} btnValue={btnValue} />
			))}
		</section>
	);
};

export default Sidebar;
