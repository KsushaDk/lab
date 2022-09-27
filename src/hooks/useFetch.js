import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotification, failedNotification } from 'Utils/constants';

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const successFetch = () =>
		toast.success('Данные успешно загружены!', successNotification);

	const failedFetch = () =>
		toast.error('Что-то пошло не так...', failedNotification);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => {
				if (response.ok) {
					successFetch();
					return response.json();
				}
				return Promise.reject(response);
			})
			.then((json) => setData(json))
			.catch((err) => {
				failedFetch();
				setError(`Error in request. Error status: ${err.status}`);
			})
			.finally(() => setLoading(false));
	}, [url]);

	return { data, error, loading };
};
