import React from 'react';

export const Td = ({
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
					<form>
						<select
							onChange={handleOnChangeField}
							name="role"
							defaultValue={td[1]}
						>
							<option value="Администратор">Администратор</option>
							<option value="Пользователь">Пользователь</option>
						</select>
					</form>
				) : (
					td[1]
				)}
			</td>
		);
	}

	return (
		<td>
			{isEditMode && rowIDToEdit === row.id ? (
				<form>
					<input
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
};
