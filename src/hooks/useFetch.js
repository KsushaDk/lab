import { useEffect, useState } from 'react';
import { getNotification } from 'Utils/getNotification';
import { infoMessage } from 'Constants/constants';

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => {
				if (response.ok) {
					getNotification.success(infoMessage.fetchSuccess);
					return response.json();
				}
				return Promise.reject(response);
			})
			.then((json) => setData(json))
			.catch((err) => {
				getNotification.failed(infoMessage.fetchFailed);
				setError(`${infoMessage.fetchEror} ${err.status}`);
			})
			.finally(() => setLoading(false));
	}, [url]);

	return { data, error, loading };
};
