import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getNotification } from 'Utils/getNotification';

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { t } = useTranslation();

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => {
				if (response.ok) {
					getNotification.success(t('infoMessage.fetchSuccess'));
					return response.json();
				}
				return Promise.reject(response);
			})
			.then((json) => setData(json))
			.catch((err) => {
				getNotification.failed(t('infoMessage.fetchFailed'));
				setError(`${t('infoMessage.fetchEror')} ${err.status}`);
			})
			.finally(() => setLoading(false));
	}, [url]);

	return { data, error, loading };
};
