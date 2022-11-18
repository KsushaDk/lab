import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PrimarySelect } from 'Components/ui/select/PrimarySelect/PrimarySelect';
import SecondaryInput from 'Components/ui/input/SecondaryInput/SecondaryInput';
import { getLinkValueForTableCell } from 'Utils/getLinkValueForTableCell';
import { getQuantityForTableCell } from 'Utils/getQuantityForTableCell';

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
}) => {
	const { t } = useTranslation();

	let roleValue = '';
	switch (value) {
		case 'admin':
		case 'админ':
			roleValue = t('signUpForm.admin');
			break;
		case 'user':
		case 'пользователь':
			roleValue = t('signUpForm.user');
			break;
		default:
			roleValue = t('signUpForm.admin');
	}

	return {
		[Cell.Empty]: null,
		[Cell.Link]: (
			<td>
				<Link className="link_black" to={value}>
					{getLinkValueForTableCell(key)}
				</Link>
			</td>
		),
		[Cell.Select]: (
			<td>
				{idToEdit === row.id ? (
					<PrimarySelect
						name="role"
						options={[t('signUpForm.admin'), t('signUpForm.user')]}
						defaultValue={value}
						hangleSelectChange={handleOnChangeField}
					/>
				) : (
					roleValue
				)}
			</td>
		),
		[Cell.Input]: (
			<td>
				{idToEdit === row.id ? (
					<form>
						<SecondaryInput
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
		[Cell.Text]: (
			<td>
				{key === 'answers' || key === 'interviews'
					? getQuantityForTableCell(row.id, key)
					: value}
			</td>
		),
	};
};
