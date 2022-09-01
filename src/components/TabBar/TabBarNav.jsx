import React from 'react';
import PropTypes from 'prop-types';

export const TabBarNav = ({ navLabel, isActive, onChangeActiveTab }) => (
	<button
		className={isActive ? 'tabbar__nav_tab active_tab' : 'tabbar__nav_tab'}
		type="button"
		onClick={() => {
			onChangeActiveTab(navLabel);
		}}
	>
		{navLabel}
	</button>
);

TabBarNav.propTypes = {
	navLabel: PropTypes.string,
	isActive: PropTypes.bool,
	onChangeActiveTab: PropTypes.func,
};

TabBarNav.defaultProps = {
	navLabel: 'Tab',
	isActive: false,
	onChangeActiveTab: () => {},
};
