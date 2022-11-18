import React from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import PrimaryDropDown from '../ui/dropdown/PrimaryDropDown';

const ActionCorrectMark = () => {
	const { t } = useTranslation();

	return (
		<PrimaryDropDown trigger={<BsCheck2 className="icon_red icon_m" />}>
			<p className="p_info-red">{t('interviewResultsPage.correctAnswer')}</p>
		</PrimaryDropDown>
	);
};

export default ActionCorrectMark;
