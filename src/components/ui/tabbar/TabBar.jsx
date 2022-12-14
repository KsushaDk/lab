import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TabBarNav } from './TabBarNav';
import './TabBar.scss';

export const TabBar = ({ children, ...attrs }) => {
	const [activeTab, setActiveTab] = useState(null);

	const getLabels = useCallback(
		(tabItems) => tabItems.map(({ props }) => props.label),
		[children]
	);

	useEffect(() => {
		setActiveTab(getLabels(children)[0]);
	}, [children]);

	return (
		<div className="tabbar__wrap" {...attrs}>
			<div className="tabbar__nav">
				{getLabels(children).map((navLabel) => (
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
		</div>
	);
};

TabBar.propTypes = {
	children: PropTypes.node,
};

TabBar.defaultProps = {
	children: null,
};
