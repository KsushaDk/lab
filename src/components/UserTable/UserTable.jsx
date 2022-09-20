import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUsers } from 'Redux/slices/userSlice';
import { setModalState } from 'Redux/slices/modalSlice';
import { columnsUsers } from 'Utils/constants';
import { PrimaryModal } from '../ui/modal/PrimaryModal/PrimaryModal';
import { Table } from '../ui/table/Table';

export const UserTable = ({ userData, searchResult }) => {
	const dispatch = useDispatch();
	const [isModalSubmitted, setModalSubmitted] = useState(false);

	const updateData = (data) => {
		dispatch(updateUsers(data));
	};

	const handleModalCancel = () => {
		dispatch(
			setModalState({
				isActive: false,
				message: '',
				isSubmitted: false,
			})
		);
		setModalSubmitted(false);
	};

	const handleModalSubmit = () => {
		dispatch(
			setModalState({
				isActive: false,
				message: '',
				isSubmitted: true,
			})
		);
		setModalSubmitted(true);
	};

	return (
		<>
			<PrimaryModal onCancel={handleModalCancel} onSubmit={handleModalSubmit} />
			<Table
				caption="Пользователи"
				columns={columnsUsers}
				searchResult={searchResult}
				rows={userData}
				total="Всего пользователей"
				updateData={updateData}
				isSubmitted={isModalSubmitted}
				setModalSubmitted={setModalSubmitted}
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
