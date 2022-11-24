import React, { useContext } from 'react';
import { ThemeContext } from 'Hoc/ThemeProvider';

const TabBarWrapper = React.lazy(() =>
	import('Components/ui/tabbar/TabBarWrapper')
);

const AboutPage = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<section className="content">
			<div className="content__head">
				<h2 className="title_l">iTechArt</h2>
				{theme === 'light' && <div className="content__picture" />}
			</div>
			<TabBarWrapper />
		</section>
	);
};

export default AboutPage;
