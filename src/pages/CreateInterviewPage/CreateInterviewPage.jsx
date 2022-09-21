import React, { useEffect, useState } from 'react';
import { CustomSelect } from 'Components/ui/select/CustomSelect/CustomSelect';

export const CreateInterviewPage = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			});
	}, []);

	return (
		<section className="content">
			<h2 className="title_m">Create interview</h2>
			<CustomSelect data={data} />
		</section>
	);
};
