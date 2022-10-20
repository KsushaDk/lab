import React from 'react';
import PropTypes from 'prop-types';
import { updateUsers } from 'Redux/slices/userSlice';
import { propTypesConst } from 'Constants/propTypesConst';
import { columnsUsers } from 'Constants/constants';
import { useUsers } from 'Hooks/useUsers';
import { TableWrapper } from '../ui/table/TableWrapper';

export const UserTable = ({ userData, searchResult }) => {
	const { currentUser } = useUsers();

	return (
		<TableWrapper
			slice={updateUsers}
			caption="Пользователи"
			total="Всего пользователей"
			columns={columnsUsers}
			rows={userData}
			searchResult={searchResult}
			current={currentUser}
		/>
	);
};

UserTable.propTypes = {
	userData: PropTypes.arrayOf(propTypesConst.userDataItem).isRequired,
	searchResult: PropTypes.arrayOf(propTypesConst.userDataItem),
};

UserTable.defaultProps = {
	searchResult: null,
};
