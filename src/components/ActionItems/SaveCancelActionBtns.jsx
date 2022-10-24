import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SecondaryBtn } from '../ui/button/SecondaryBtn/SecondaryBtn';

export const SaveCancelActionBtns = ({
	handleSaveEditing,
	handleCancelEditing,
}) => {
	const { t } = useTranslation();
	return (
		<>
			<SecondaryBtn
				btnValue={t('btnValues.save')}
				handleClick={handleSaveEditing}
			/>
			<SecondaryBtn
				btnValue={t('btnValues.cancel')}
				handleClick={handleCancelEditing}
			/>
		</>
	);
};

SaveCancelActionBtns.propTypes = {
	handleSaveEditing: PropTypes.func,
	handleCancelEditing: PropTypes.func,
};

SaveCancelActionBtns.defaultProps = {
	handleSaveEditing: () => {},
	handleCancelEditing: () => {},
};
