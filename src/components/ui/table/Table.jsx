import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

export const Table = ({ cols, data, caption, total }) => {
	console.log(data);

	let tableRows;

	if (caption === 'Мои опросы') {
		tableRows = data.map((tr) => (
			<tr key={tr.name}>
				<td>{tr.name}</td>
				<td>{tr.date}</td>
				<td>{tr.answers}</td>
				<td>
					<a href="/">{tr.link}</a>
				</td>
				<td>
					<a href="/">{tr.results}</a>
				</td>
				<td>{tr.activity}</td>
			</tr>
		));
	} else {
		tableRows = data.map((tr) => (
			<tr key={tr.name}>
				<td>{tr.name}</td>
				<td>{tr.role}</td>
				<td>{tr.date}</td>
				<td>{tr.interviews}</td>
				<td>{tr.activity}</td>
			</tr>
		));
	}
	return (
		<table className="content__table">
			<caption>{caption}</caption>
			<thead>
				<tr>
					{cols.map((th) => (
						<th scope="col" key={th}>
							{th}
						</th>
					))}
				</tr>
			</thead>
			<tbody>{tableRows}</tbody>
			<tfoot>
				<tr>
					<th scope="row">{total}:</th>
					<td colSpan="2">{data.length}</td>
					<td colSpan={(cols.length - 3).toString()}> === </td>
				</tr>
			</tfoot>
		</table>
	);
};

Table.propTypes = {
	caption: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	cols: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			role: PropTypes.string,
			date: PropTypes.string,
			interviews: PropTypes.number,
			activity: PropTypes.string,
		})
	).isRequired,
};
