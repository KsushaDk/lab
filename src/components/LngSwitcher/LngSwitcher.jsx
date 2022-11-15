import React, { useCallback } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { lngs } from 'Constants/constants';
import './LngSwitcher.scss';

const PrimaryDropDown = React.lazy(() =>
	import('../ui/dropdown/PrimaryDropDown')
);

const LngSwitcher = () => {
	const { i18n } = useTranslation();

	const handleClick = useCallback((lng) => {
		i18n.changeLanguage(lng);
	});

	return (
		<div className="lng-switcher__wrapper">
			<PrimaryDropDown trigger={<BsGlobe className="icon_white icon_l" />}>
				{Object.keys(lngs).map((lng) => (
					<div
						className="lng-switcher__item"
						key={lng}
						onClick={() => handleClick(lng)}
						style={{
							fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
						}}
					>
						{lng}
					</div>
				))}
			</PrimaryDropDown>
		</div>
	);
};

export default LngSwitcher;
