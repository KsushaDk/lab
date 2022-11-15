import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsAsterisk } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
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
import { barOptions, columnsTextResults } from 'Constants/constants';
import { propTypesConst } from 'Constants/propTypesConst';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Table = React.lazy(() => import('Components/ui/table/Table'));

const InterviewResultsItem = ({ question, interview }) => {
	const [chartData, setChartData] = useState(null);
	const [numOptions, setNumOptions] = useState([]);
	const [textOptions, setTextOptions] = useState([]);

	const { t } = useTranslation();

	useEffect(() => {
		const labels = question.options.map(
			(option, index) => `${t('infoMessage.answer')} ${index + 1}`
		);

		const {
			optionsData,
			selectedOptions,
			optionsColor,
		} = getDataForQuestionResults(interview, question);

		const getTextOptions = interview.allQuestions
			.filter((item) => item.type === 'text' && item.id === question.id)
			.map((q) => ({ userId: q.userId, ...q.options[0] }));

		setTextOptions(getTextOptions);
		setNumOptions(selectedOptions);

		setChartData({
			labels,
			datasets: [
				{
					label: question.question,
					data: optionsData,
					backgroundColor: Object.values(optionsColor),
				},
			],
		});
	}, []);

	return (
		<div className="content__body_item_center">
			{chartData && (
				<>
					<h2 className="title_xs">
						{question.question}
						&nbsp;
						{question.required && (
							<>
								&#40;
								<BsAsterisk className="icon_red icon_xs" />
								&#41;
							</>
						)}
					</h2>
					{question.type !== 'text' ? (
						<>
							<div className="chart__wrapper">
								<Bar options={barOptions} data={chartData} />
							</div>
							<div className="results__info">
								{question.options.map((option, index) => (
									<div key={option.id}>
										{t('infoMessage.answer')}&nbsp;{index + 1}:&nbsp;
										<span className="p_info ">
											{numOptions[option.title]}&nbsp;
											{t('infoMessage.answers')}
										</span>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							<h3 className="p_info-red">
								{`${t('interviewResultsPage.correctAnswer')}: ${
									textOptions[0].answer
								}`}
							</h3>
							<Table
								columns={columnsTextResults}
								rows={textOptions}
								total={t('interviewResultsPage.total')}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};

InterviewResultsItem.propTypes = {
	interview: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		total: PropTypes.number,
		questions: PropTypes.arrayOf(propTypesConst.question),
		allQuestions: PropTypes.arrayOf(propTypesConst.question),
	}),
	question: propTypesConst.question,
};

InterviewResultsItem.defaultProps = {
	interview: {},
	question: {},
};

export default InterviewResultsItem;
