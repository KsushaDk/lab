/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TabBarNav } from './TabBarNav';
import './TabBar.scss';

export const TabBar = ({ children, ...attrs }) => {
	const [activeTab, setActiveTab] = useState(null);

	// eslint-disable-next-line no-shadow
	const getChildrenLabels = (children) => {
		const labels = children.map(({ props }) => props.label);
		return labels;
	};

	useEffect(() => {
		// eslint-disable-next-line no-shadow
		const activeTab = getChildrenLabels(children)[0];

		setActiveTab(activeTab);
	}, []);

	return (
		<section className="tabbar" {...attrs}>
			<div className="tabbar__nav">
				{getChildrenLabels(children).map((navLabel) => (
					<TabBarNav
						isActive={activeTab === navLabel}
						key={navLabel}
						navLabel={navLabel}
						onChangeActiveTab={setActiveTab}
					/>
				))}
			</div>

			<div className="tabbar__content">
				{React.Children.map(children, (child) =>
					React.cloneElement(child, { activeTab })
				)}
			</div>
		</section>
	);
};

TabBar.propTypes = {
	children: PropTypes.node,
};

TabBar.defaultProps = {
	children: null,
};
