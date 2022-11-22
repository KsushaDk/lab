import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsAsterisk } from 'react-icons/bs';
import ActionCorrectMark from 'Components/ActionItems/ActionCorrectMark';
import { getOptionToRender } from 'Constants/OptionType';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import { getOptionType } from 'Utils/getOptionType';

const UserInterviewResult = ({ userId, interviewId }) => {
	const [userResults, setUserResults] = useState(null);

	const { t } = useTranslation();

	useEffect(() => {
		const answersFromLS = getFromLSByKey('answers');
		const userAnswers = answersFromLS?.filter(
			(answer) => answer.userId === userId
		);
		const userResultsData = userAnswers.filter(
			(interview) => interview.id === interviewId
		);

		setUserResults(userResultsData[0]);
	}, [userId]);

	if (!userResults) {
		return (
			<div className="content__body_center">
				<h2 className="title_xs">{t('infoMessage.noUsersAnswer')}</h2>
			</div>
		);
	}

	return (
		<div className="content__body_center">
			{userResults.questions.map((question, index) => (
				<div className="content__body_item_center" key={question.id}>
					<h2 className="title_xs">
						{userResults.queries.questionNum && `${index + 1}.`}&nbsp;
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
					<ul className="question__list" role="menu">
						{question.options.map((option) => (
							<li
								className="question__list_option"
								role="menuitem"
								aria-label="option"
								key={option.id}
								id={option.id}
							>
								{getOptionToRender(option)[getOptionType(question.type)]}
								{option.correct && <ActionCorrectMark />}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

UserInterviewResult.propTypes = {
	userId: PropTypes.string.isRequired,
	interviewId: PropTypes.string.isRequired,
};

export default UserInterviewResult;
