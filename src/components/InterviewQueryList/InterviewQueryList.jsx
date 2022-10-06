import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';

export const InterviewQueryList = ({ queries, handleChangeQuery }) => (
	<div className="interview__settings">
		<h3 className="title_xs">Параметры опроса</h3>
		<ul className="settings__list" role="menu">
			{queries.map((query) => (
				<li
					className="settings__list_option"
					key={query.id}
					id={query.id}
					onClick={handleChangeQuery}
					role="menuitem"
				>
					<CheckboxInput option={query} />
				</li>
			))}
		</ul>
	</div>
);

InterviewQueryList.propTypes = {
	handleChangeQuery: PropTypes.func,
};

InterviewQueryList.defaultProps = {
	handleChangeQuery: () => {},
};
