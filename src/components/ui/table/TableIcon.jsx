import React from 'react';
import PropTypes from 'prop-types';

export const TableIcon = ({ btnIcon, handleClick, ...args }) => (
	<button className="table_icon" type="button" {...args} onClick={handleClick}>
		{btnIcon}
	</button>
);

TableIcon.propTypes = {
	btnIcon: PropTypes.node.isRequired,
	handleClick: PropTypes.func,
};

TableIcon.defaultProps = {
	handleClick: undefined,
};
