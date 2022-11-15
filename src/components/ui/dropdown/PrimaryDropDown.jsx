import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './PrimaryDropDown.scss';

const PrimaryDropDown = ({ trigger, children, ...attrs }) => {
	const [isShown, setShown] = useState(false);

	const handleDropMenu = useCallback(() => {
		setShown((prevState) => !prevState);
	});

	return (
		<div
			className="dropdown"
			role="button"
			aria-label="dropdown-icon"
			tabIndex={0}
			onMouseOver={handleDropMenu}
			onMouseOut={handleDropMenu}
			onFocus={handleDropMenu}
			onBlur={handleDropMenu}
			{...attrs}
		>
			{trigger}

			{isShown && <div className="dropdown__content">{children}</div>}
		</div>
	);
};

PrimaryDropDown.propTypes = {
	children: PropTypes.node,
	trigger: PropTypes.node,
};

PrimaryDropDown.defaultProps = {
	children: null,
	trigger: null,
};

export default PrimaryDropDown;
