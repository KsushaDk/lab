import React from 'react';
import PropTypes from 'prop-types';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setModalState } from 'Redux/slices/modalSlice';
import { TableCell } from './TableCell';
import { IconBtn } from '../button/IconBtn/IconBtn';
import { TableDropMenu } from './TableDropMenu';

export const TableRow = ({
	total,
	current,
	row,
	editedRow,
	rowIDToEdit,
	isEditMode,
	handleOnChangeField,
	handleEdit,
	handleCancelEditing,
	handleRemoveRow,
}) => {
	const dispatch = useDispatch();

	return (
		<tr>
			{Object.entries(row).map((td) => (
				<TableCell
					key={td[0]}
					isEditMode={isEditMode}
					rowIDToEdit={rowIDToEdit}
					row={row}
					td={td}
					editedRow={editedRow}
					handleOnChangeField={(e) => handleOnChangeField(e)}
				/>
			))}

			<td>
				{isEditMode && rowIDToEdit === row.id ? (
					<IconBtn
						type="submit"
						handleClick={() => {
							dispatch(
								setModalState({
									isActive: true,
									message: 'Вы действительно хотите сохранить изменения?',
									btnValues: ['Сохранить', 'Отмена'],
									isSubmitted: false,
								})
							);
						}}
						btnIcon={<BsCheckSquare />}
					/>
				) : (
					<IconBtn
						handleClick={() => handleEdit(row.id)}
						btnIcon={<ImPencil />}
					/>
				)}

				{isEditMode && rowIDToEdit === row.id ? (
					<IconBtn
						handleClick={() => handleCancelEditing()}
						btnIcon={<BsXSquare />}
					/>
				) : (
					<IconBtn
						handleClick={() => handleRemoveRow(row.id)}
						disabled={current?.id === row.id}
						btnIcon={<ImBin />}
					/>
				)}

				{total.includes('опросов') && <TableDropMenu />}
			</td>
		</tr>
	);
};

TableRow.propTypes = {
	total: PropTypes.string.isRequired,
	row: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string,
			username: PropTypes.string,
			email: PropTypes.string,
			password: PropTypes.string,
			role: PropTypes.string,
			registered: PropTypes.string,
			interviews: PropTypes.number,
		}),
		PropTypes.shape({
			id: PropTypes.string,
			changed: PropTypes.string,
			answers: PropTypes.number,
			title: PropTypes.string,
			link: PropTypes.string,
			results: PropTypes.string,
		}),
	]).isRequired,
	current: PropTypes.shape({
		id: PropTypes.string,
		username: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		role: PropTypes.string,
		registered: PropTypes.string,
		interviews: PropTypes.number,
	}),
	rowIDToEdit: PropTypes.string,
	isEditMode: PropTypes.bool.isRequired,
	handleOnChangeField: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleCancelEditing: PropTypes.func.isRequired,
	handleRemoveRow: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
	current: undefined,
	rowIDToEdit: undefined,
};
