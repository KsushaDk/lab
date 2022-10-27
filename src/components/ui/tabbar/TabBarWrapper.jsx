import React from 'react';
import { useTranslation } from 'react-i18next';
import { labels, dammyText } from 'Constants/constants';
import { TabBar } from './TabBar';
import { TabBarItem } from './TabBarItem';

export const TabBarWrapper = () => {
	const { t } = useTranslation();

	return (
		<TabBar>
			{labels.map((label) => (
				<TabBarItem label={label} key={label}>
					<h3 className="title_s underline">{t(`tabBarLabels.${label}`)}</h3>
					<p className="p_primary">{dammyText}</p>
				</TabBarItem>
			))}
		</TabBar>
	);
};
