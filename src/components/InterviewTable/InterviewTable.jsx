import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateInterviews } from 'Redux/slices/interviewSlice';
import { setModalState } from 'Redux/slices/modalSlice';
import { columnsInterviews } from 'Utils/constants';
import { getModalResponse } from 'Utils/getModalResponse';
import { Table } from '../ui/table/Table';
import { PrimaryModal } from '../ui/modal/PrimaryModal/PrimaryModal';

export const InterviewTable = ({ interviewData, searchResult }) => {
	const dispatch = useDispatch();

	const [isModalSubmitted, setModalSubmitted] = useState(false);

	const updateData = useCallback((data) => {
		dispatch(updateInterviews(data));
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
				caption="Мои опросы"
				rows={interviewData}
				searchResult={searchResult}
				columns={columnsInterviews}
				total="Всего опросов"
				updateData={updateData}
				isSubmitted={isModalSubmitted}
				setModalSubmitted={setModalSubmitted}
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

InterviewTable.defaultProps = {
	searchResult: null,
};
