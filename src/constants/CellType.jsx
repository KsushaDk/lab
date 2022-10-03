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
	idToEdit,
	row,
	handleOnChangeField,
	editedItem,
}) => ({
	[Cell.Empty]: null,
	[Cell.Link]: (
		<td>
			<a className="link_black" href="/">
				{value}
			</a>
		</td>
	),
	[Cell.Select]: (
		<td>
			{idToEdit === row.id ? (
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
			{idToEdit === row.id ? (
				<form>
					<input
						className="secondary_input"
						autoComplete="off"
						type="text"
						defaultValue={editedItem ? editedItem[key] : value}
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
