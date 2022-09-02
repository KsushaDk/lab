import React from 'react';
import { TabBarWrapper } from 'Components/TabBarWrapper/TabBarWrapper';
import './AboutPage.scss';

export const AboutPage = () => (
	<section className="main__content">
		<div className="main__content_header">
			<h2 className="main__content_title ">iTechArt</h2>
			<div className="main__content_picture" />
		</div>
		<TabBarWrapper />
	</section>
);
