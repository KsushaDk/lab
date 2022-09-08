import React from 'react';
import { labels, dammyText } from 'Utils/constants';
import { TabBar } from '../ui/tabbar/TabBar';
import { TabBarItem } from '../ui/tabbar/TabBarItem';

export const TabBarWrapper = () => (
	<TabBar>
		{labels.map((label) => (
			<TabBarItem label={label} key={label}>
				<h4>{label}</h4>
				<p>{dammyText}</p>
			</TabBarItem>
		))}
	</TabBar>
);
