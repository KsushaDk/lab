import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDataForQuestionResults } from 'Utils/getDataForQuestionResults';
import { barOptions } from 'Constants/constants';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const InterviewResultsItem = ({ question, interview }) => {
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const labels = question.options.map((option) => option.title);
		const { optionsData } = getDataForQuestionResults(interview, question);

		setChartData({
			labels,
			datasets: [
				{
					label: question.question,
					data: optionsData,
					backgroundColor: ['#eb3d26'],
					hoverBackgroundColor: 'rgba(152, 152, 152, 0.91)',
				},
			],
		});
	}, []);

	return (
		<div className="content__body_item_center">
			{question.type !== 'text' && chartData && (
				<>
					<h2 className="title_s">{question.question}</h2>
					<Bar options={barOptions} data={chartData} />
					<div className="results__info">
						{question.options.map((option) => (
							<div key={option.id}>{option.title}</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

// InterviewResultsItem.propTypes = {};

export default InterviewResultsItem;
