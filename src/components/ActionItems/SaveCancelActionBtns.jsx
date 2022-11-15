import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SecondaryBtn = React.lazy(() =>
	import('../ui/button/SecondaryBtn/SecondaryBtn')
);

const SaveCancelActionBtns = ({ handleSaveEditing, handleCancelEditing }) => {
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

export default SaveCancelActionBtns;
