import React from 'react';
import { PrimarySelect } from '../select/PrimarySelect/PrimarySelect';

export const TableCell = ({
	isEditMode,
	rowIDToEdit,
	editedRow,
	row,
	td,
	handleOnChangeField,
}) => {
	if (td[0] === 'id') {
		return null;
	}

	if (td[0] === 'link' || td[0] === 'results') {
		return (
			<td>
				<a href="/">{td[1]}</a>
			</td>
		);
	}

	if (td[0] === 'role') {
		return (
			<td>
				{isEditMode && rowIDToEdit === row.id ? (
					<PrimarySelect
						name="role"
						options={['Администратор', 'Пользователь']}
						defaultValue={td[1]}
						hangleSelectChange={handleOnChangeField}
					/>
				) : (
					td[1]
				)}
			</td>
		);
	}

	if (td[0] === 'username' || td[0] === 'title') {
		return (
			<td>
				{isEditMode && rowIDToEdit === row.id ? (
					<form>
						<input
							className="secondary_input"
							autoComplete="off"
							type="text"
							defaultValue={editedRow ? editedRow[td[0]] : td[1]}
							id={row.id}
							name={td[0]}
							onBlur={handleOnChangeField}
						/>
					</form>
				) : (
					td[1]
				)}
			</td>
		);
	}

	return <td>{td[1]}</td>;
};
