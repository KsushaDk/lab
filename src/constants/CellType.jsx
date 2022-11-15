import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PrimarySelect } from 'Components/ui/select/PrimarySelect/PrimarySelect';
import SecondaryInput from 'Components/ui/input/SecondaryInput/SecondaryInput';

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

	let linkValue = '';
	switch (key) {
		case 'link':
			linkValue = t('infoMessage.interviewLink');
			break;
		case 'results':
			linkValue = t('infoMessage.resultLink');
			break;
		case 'userId':
			linkValue = t('infoMessage.showUserAnswers');
			break;

		default:
			linkValue = 'link';
	}

	return {
		[Cell.Empty]: null,
		[Cell.Link]: (
			<td>
				<Link className="link_black" to={value}>
					{linkValue}
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
					value
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
				{key === 'interviews' || key === 'answers' ? value.length : value}
			</td>
		),
	};
};
