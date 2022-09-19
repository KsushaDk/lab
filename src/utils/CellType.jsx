import React from 'react';
import { PrimarySelect } from 'Components/ui/select/PrimarySelect/PrimarySelect';

export const Cell = Object.freeze({
	Empty: 1,
	Link: 2,
	Select: 3,
	Input: 4,
	Text: 5,
});

export const getСellToRender = ({
	key,
	value,
	isEditMode,
	rowIDToEdit,
	row,
	handleOnChangeField,
	editedRow,
}) => ({
	[Cell.Empty]: null,
	[Cell.Link]: (
		<td>
			<a href="/">{value}</a>
		</td>
	),
	[Cell.Select]: (
		<td>
			{isEditMode && rowIDToEdit === row.id ? (
				<PrimarySelect
					name="role"
					options={['Администратор', 'Пользователь']}
					defaultValue={value}
					hangleSelectChange={handleOnChangeField}
				/>
			) : (
				value
			)}
		</td>
	),
	[Cell.Input]: (
		<td>
			{isEditMode && rowIDToEdit === row.id ? (
				<form>
					<input
						className="secondary_input"
						autoComplete="off"
						type="text"
						defaultValue={editedRow ? editedRow[key] : value}
						id={row.id}
						name={key}
						onBlur={handleOnChangeField}
					/>
				</form>
			) : (
				value
			)}
		</td>
	),
	[Cell.Text]: <td>{value}</td>,
});
