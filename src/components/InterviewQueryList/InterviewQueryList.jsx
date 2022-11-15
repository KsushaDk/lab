import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CheckboxInput } from 'Components/ui/input/CheckboxInput/CheckboxInput';
import { selectElByKeyDown } from 'Utils/selectElByKeyDown';
import { propTypesConst } from 'Constants/propTypesConst';

const InterviewQueryList = ({ queries, handleChangeQuery }) => {
	const { t } = useTranslation();

	return (
		<div className="interview__settings">
			<h3 className="title_xs">{t('interviewQueries.title')}</h3>
			<ul className="settings__list" role="menu">
				{queries.map((query, index) => (
					<li
						className="settings__list_option"
						key={query.id}
						id={query.id}
						index={index}
						onClick={handleChangeQuery}
						role="menuitem"
						aria-label="interview-query"
						tabIndex={0}
						onKeyDown={(e) => {
							selectElByKeyDown(e, handleChangeQuery, queries);
						}}
					>
						<CheckboxInput option={query} />
					</li>
				))}
			</ul>
		</div>
	);
};

InterviewQueryList.propTypes = {
	queries: PropTypes.arrayOf(propTypesConst.query),
	handleChangeQuery: PropTypes.func,
};

InterviewQueryList.defaultProps = {
	handleChangeQuery: () => {},
	queries: [],
};

export default InterviewQueryList;
