import React from 'react';
import PropTypes from 'prop-types';

export const TabBarItem = ({ children, label, activeTab, ...attrs }) => {
	if (activeTab !== label) {
		return null;
	}

	return (
		<div className="tabbar__content_item" {...attrs}>
			{children}
		</div>
	);
};

TabBarItem.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.node,
	activeTab: PropTypes.string,
};

TabBarItem.defaultProps = {
	children: null,
	activeTab: '',
};
