import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ImPencil, ImBin } from 'react-icons/im';
import { BsXSquare, BsCheckSquare, BsCaretDownFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { propTypesConst } from 'Constants/propTypesConst';
import { setModalState } from 'Redux/slices/modalSlice';
import { IconBtn } from '../button/IconBtn/IconBtn';

const PrimaryDropDown = React.lazy(() => import('../dropdown/PrimaryDropDown'));
const TableCell = React.lazy(() => import('./TableCell'));

const TableRow = ({
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

	const { t } = useTranslation();

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
			{!total.includes(t('interviewResultsPage.total')) && (
				<td>
					{idToEdit === row.id ? (
						<IconBtn
							type="submit"
							handleClick={() => {
								dispatch(
									setModalState({
										isActive: true,
										message: t('infoMessage.submitSave'),
										btnValues: [t('btnValues.save'), t('btnValues.cancel')],
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

					{total.includes(t('interviewTable.total')) && (
						<PrimaryDropDown
							trigger={<IconBtn btnIcon={<BsCaretDownFill />} />}
						>
							<Link
								className="dropdown__content_link disabled_item"
								to="/home/create"
							>
								Copy
							</Link>
							<Link
								className="dropdown__content_link disabled_item"
								to="/home/create"
							>
								Play/Resume
							</Link>
						</PrimaryDropDown>
					)}
				</td>
			)}
		</tr>
	);
};

TableRow.propTypes = {
	total: PropTypes.string,
	row: PropTypes.oneOfType([propTypesConst.tableRowsItem]).isRequired,
	current: propTypesConst.userDataItem,
	idToEdit: PropTypes.string,
	handleOnChangeField: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleCancelEditing: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
	current: undefined,
	idToEdit: null,
	total: null,
};

export default TableRow;
