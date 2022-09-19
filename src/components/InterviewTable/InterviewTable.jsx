import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateInterviews } from 'Redux/slices/interviewSlice';
import { setModalState } from 'Redux/slices/modalSlice';
import { columnsInterviews } from 'Utils/constants';
import { Table } from '../ui/table/Table';
import { PrimaryModal } from '../ui/modal/PrimaryModal/PrimaryModal';

export const InterviewTable = ({ interviewData }) => {
	const dispatch = useDispatch();
	const [isModalSubmitted, setModalSubmitted] = useState(false);

	const updateData = (data) => {
		dispatch(updateInterviews(data));
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
				caption="Мои опросы"
				rows={interviewData}
				columns={columnsInterviews}
				total="Всего опросов"
				updateData={updateData}
				isSubmitted={isModalSubmitted}
			/>
		</>
	);
};

InterviewTable.propTypes = {
	interviewData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		})
	).isRequired,
};
