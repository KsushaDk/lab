import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUsers } from 'Redux/slices/userSlice';
import { setModalState } from 'Redux/slices/modalSlice';
import { columnsUsers } from 'Utils/constants';
import { getModalResponse } from 'Utils/getModalResponse';
import { useUsers } from 'Hooks/useUsers';
import { PrimaryModal } from '../ui/modal/PrimaryModal/PrimaryModal';
import { Table } from '../ui/table/Table';

export const UserTable = ({ userData, searchResult }) => {
	const dispatch = useDispatch();

	const [isModalSubmitted, setModalSubmitted] = useState(false);

	const { currentUser } = useUsers();

	const updateData = useCallback((data) => {
		dispatch(updateUsers(data));
	}, []);

	const handleModalClick = (e) => {
		const btnValue = e.target.value;
		const modalResponse = getModalResponse(btnValue);

		dispatch(
			setModalState({
				isActive: false,
				message: '',
				btnValues: [],
				isSubmitted: modalResponse,
			})
		);
		setModalSubmitted(modalResponse);
	};

	return (
		<>
			<PrimaryModal handleModalClick={handleModalClick} />
			<Table
				caption="Пользователи"
				columns={columnsUsers}
				searchResult={searchResult}
				rows={userData}
				total="Всего пользователей"
				updateData={updateData}
				isSubmitted={isModalSubmitted}
				setModalSubmitted={setModalSubmitted}
				current={currentUser}
			/>
		</>
	);
};

UserTable.propTypes = {
	userData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	).isRequired,
	searchResult: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	),
};

UserTable.defaultProps = {
	searchResult: null,
};
