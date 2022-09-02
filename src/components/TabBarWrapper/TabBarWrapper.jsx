import React from 'react';
import { labels } from 'Utils/constants';
import { TabBar } from '../ui/tabbar/TabBar';
import { TabBarItem } from '../ui/tabbar/TabBarItem';

export const TabBarWrapper = () => (
	<TabBar>
		{labels.map((label) => (
			<TabBarItem label={label} key={label}>
				<h4>{label}</h4>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the standard dummy text ever since
				</p>
			</TabBarItem>
		))}
	</TabBar>
);
