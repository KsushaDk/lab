import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorFallback } from 'Components/ErrorFallback/ErrorFallback';
import { getFromLSByKey } from 'Utils/funcForLSByKey';
import './UserInterviewListPage.scss';

const UserInterviewListPage = () => {
	const [interviewList, setInterviewList] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		const interviews = getFromLSByKey('interviews');
		interviews && setInterviewList([...interviews]);
	}, []);
	return (
		<section className="content">
			<h2 className="title_m">{t('userInterviewListPage.title')}</h2>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				{!interviewList ? (
					<h2 className="title_s_red">{t('infoMessage.noInterviews')}</h2>
				) : (
					<ol className="interview__list">
						{interviewList.map((item) => (
							<li key={item.id}>
								<Link className="link_black" to={`/interview/${item.id}`}>
									{item.title}
								</Link>
							</li>
						))}
					</ol>
				)}
			</ErrorBoundary>
		</section>
	);
};

export default UserInterviewListPage;
