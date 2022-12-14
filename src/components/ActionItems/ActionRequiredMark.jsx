import React from 'react';
import PropTypes from 'prop-types';
import { BsAsterisk } from 'react-icons/bs';
import { propTypesConst } from 'Constants/propTypesConst';
import { CheckboxInput } from '../ui/input/CheckboxInput/CheckboxInput';

const ActionRequiredMark = ({
	currentItem,
	idToEdit,
	currentId,
	handleRequiredField,
}) => {
	if (idToEdit === currentId) {
		return (
			<div className="question__control_required" onClick={handleRequiredField}>
				<CheckboxInput
					option={{
						id: currentItem.id,
						checked: currentItem.required,
						key: 'required',
					}}
				/>
			</div>
		);
	}
	if (currentItem.required) {
		return <BsAsterisk className="icon_red icon_xs" />;
	}
};

ActionRequiredMark.propTypes = {
	idToEdit: PropTypes.string,
	currentId: PropTypes.string,
	currentItem: propTypesConst.question,
	handleRequiredField: PropTypes.func,
};

ActionRequiredMark.defaultProps = {
	idToEdit: null,
	currentId: null,
	currentItem: 0,
	handleRequiredField: () => {},
};

export default ActionRequiredMark;
