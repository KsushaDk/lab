import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare, BsCaretDownFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { propTypesConst } from 'Constants/propTypesConst';
import { modalMessage } from 'Constants/constants';
import { setModalState } from 'Redux/slices/modalSlice';
import { PrimaryDropDown } from '../dropdown/PrimaryDropDown';
import { IconBtn } from '../button/IconBtn/IconBtn';
import { TableCell } from './TableCell';

export const TableRow = ({
	total,
	current,
	row,
	editedItem,
	idToEdit,
	handleOnChangeField,
	handleEdit,
	handleCancelEditing,
	handleRemove,
}) => {
	const dispatch = useDispatch();

	return (
		<tr>
			{Object.entries(row).map((td) => (
				<TableCell
					key={td[0]}
					idToEdit={idToEdit}
					row={row}
					td={td}
					editedItem={editedItem}
					handleOnChangeField={(e) => handleOnChangeField(e)}
				/>
			))}

			<td>
				{idToEdit === row.id ? (
					<IconBtn
						type="submit"
						handleClick={() => {
							dispatch(
								setModalState({
									isActive: true,
									message: modalMessage.submitSave,
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

				{idToEdit === row.id ? (
					<IconBtn
						handleClick={() => handleCancelEditing()}
						btnIcon={<BsXSquare />}
					/>
				) : (
					<IconBtn
						handleClick={() => handleRemove(row.id)}
						disabled={current?.id === row.id}
						btnIcon={<ImBin />}
					/>
				)}

				{total.includes('опросов') && (
					<PrimaryDropDown trigger={<IconBtn btnIcon={<BsCaretDownFill />} />}>
						<Link className="dropdown__content_link" to="/home/create">
							Copy
						</Link>
						<Link className="dropdown__content_link" to="/home/create">
							Play/Resume
						</Link>
					</PrimaryDropDown>
				)}
			</td>
		</tr>
	);
};

TableRow.propTypes = {
	total: PropTypes.string.isRequired,
	row: PropTypes.oneOfType([propTypesConst.tableRowsItem]).isRequired,
	current: propTypesConst.currentUser,
	idToEdit: PropTypes.string,
	handleOnChangeField: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleCancelEditing: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
	current: undefined,
	idToEdit: null,
};
