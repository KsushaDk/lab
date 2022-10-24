import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const TabBarNav = ({ navLabel, isActive, onChangeActiveTab }) => {
	const { t } = useTranslation();
	return (
		<button
			className={isActive ? 'tabbar__nav_tab active_tab' : 'tabbar__nav_tab'}
			type="button"
			onClick={() => {
				onChangeActiveTab(navLabel);
			}}
		>
			{t(`tabBarLabels.${navLabel}`)}
		</button>
	);
};

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
