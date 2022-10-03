import React from 'react';
import { labels, dammyText } from 'Constants/constants';
import { TabBar } from './TabBar';
import { TabBarItem } from './TabBarItem';

export const TabBarWrapper = () => (
	<TabBar>
		{labels.map((label) => (
			<TabBarItem label={label} key={label}>
				<h3 className="title_s underline">{label}</h3>
				<p className="p_primary">{dammyText}</p>
			</TabBarItem>
		))}
	</TabBar>
);
