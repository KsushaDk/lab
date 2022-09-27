import React from 'react';
import { CustomSelect } from 'Components/ui/select/CustomSelect/CustomSelect';
import { Loader } from 'Components/Loader/Loader';
import { useFetch } from '../../hooks/useFetch';

export const CreateInterviewPage = () => {
	const { data, loading, error } = useFetch(
		'https://jsonplaceholder.typicode.com/todos'
	);

	return (
		<section className="content">
			<h2 className="title_m">Create interview</h2>
			{error && <h2 className="enter_error">{error}</h2>}
			{loading ? (
				<Loader />
			) : (
				<>
					<CustomSelect data={data} multi={false} />
					<CustomSelect data={data} multi />
				</>
			)}
		</section>
	);
};
