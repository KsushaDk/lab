import React from 'react';

const TabBarWrapper = React.lazy(() =>
	import('Components/ui/tabbar/TabBarWrapper')
);

const AboutPage = () => (
	<section className="content">
		<div className="content__head">
			<h2 className="title_l">iTechArt</h2>
			<div className="content__picture" />
		</div>
		<TabBarWrapper />
	</section>
);

export default AboutPage;
