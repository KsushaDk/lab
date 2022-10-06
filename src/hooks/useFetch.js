import { useEffect, useState } from 'react';
import { getNotification } from 'Utils/getNotification';

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => {
				if (response.ok) {
					getNotification.success('Данные успешно загружены!');
					return response.json();
				}
				return Promise.reject(response);
			})
			.then((json) => setData(json))
			.catch((err) => {
				getNotification.failed('Что-то пошло не так...');
				setError(`Error in request. Error status: ${err.status}`);
			})
			.finally(() => setLoading(false));
	}, [url]);

	return { data, error, loading };
};
