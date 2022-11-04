import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsChevronUp, BsChevronDown, BsX } from 'react-icons/bs';
import { propTypesConst } from 'Constants/propTypesConst';
import { useDebounce } from 'Hooks/useDebounce';
import { selectElByKeyDown } from 'Utils/selectElByKeyDown';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { getSearchResult } from 'Utils/getSearchResult';
import { findInArrByID } from 'Utils/findInArrByID';
import { CheckboxInput } from '../../input/CheckboxInput/CheckboxInput';
import { IconBtn } from '../../button/IconBtn/IconBtn';
import './CustomSelect.scss';

const CustomSelect = ({ data, handleChange, multi }) => {
	const [options, setOptions] = useState([]);
	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [search, setSearch] = useState('');

	const { t } = useTranslation();

	const debouncedSearch = useDebounce(search, 500);

	const toggleOption = () => {
		setIsOptionOpen((prevState) => !prevState);
	};

	const handleChangeInput = (e) => {
		setSelectedOption(null);
		setSearch(e.target.value);
	};

	const handleSingleSelection = (id) => {
		const selected = findInArrByID(options, id);

		setSelectedOption(selected);
		setIsOptionOpen(false);
	};

	const handleMultiSelection = (id) => {
		const updatedOptions = toggleValueByKey(options, id, 'checked');

		setOptions(updatedOptions);
	};

	const handleChangeOption = (e, id = e.currentTarget.id) => {
		e.stopPropagation();

		multi ? handleMultiSelection(id) : handleSingleSelection(id);
	};

	useEffect(() => {
		const searchResult = getSearchResult(data, debouncedSearch, 'title');
		setOptions(searchResult);
	}, [debouncedSearch]);

	useEffect(() => {
		// const updatedOptions = data.map((option) => {
		// 	if (option.question === undefined) {
		// 		option.checked = false;
		// 		return option;
		// 	}
		// 	return option;
		// });
		// setOptions(data);
	}, [data]);

	useEffect(() => {
		handleChange(options);
	}, [options]);

	return (
		<div className="select__wrapper" onClick={toggleOption}>
			<div className="select__header">
				{multi ? (
					<div className="select__header_input-multi" role="button">
						{options.map(
							(option) =>
								option.checked && (
									<div className="input-multi_item" key={option.id}>
										<span>{option.title}</span>
										<IconBtn
											btnIcon={<BsX />}
											className="icon_white icon_m"
											handleClick={(e) => handleChangeOption(e, option.id)}
										/>
									</div>
								)
						)}
					</div>
				) : (
					<input
						className="select__header_input"
						type="text"
						onChange={handleChangeInput}
						placeholder="Search..."
						value={selectedOption?.title || search || ''}
					/>
				)}
				<IconBtn btnIcon={isOptionOpen ? <BsChevronUp /> : <BsChevronDown />} />
			</div>

			{isOptionOpen && (
				<div className="select__content">
					<ul className="select__options" role="menu">
						{options.length === 0 ? (
							<li className="select__option">
								{t('infoMessage.noSearchResult')}
							</li>
						) : (
							options.map((option, index) => (
								<li
									className={
										option.checked
											? 'select__option selected'
											: 'select__option'
									}
									key={option.id}
									id={option.id}
									index={index}
									role="menuitem"
									tabIndex={0}
									onKeyDown={(e) => {
										selectElByKeyDown(e, handleChangeOption, options);
									}}
									onClick={handleChangeOption}
								>
									{multi ? <CheckboxInput option={option} /> : option.title}
								</li>
							))
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

CustomSelect.propTypes = {
	multi: PropTypes.bool.isRequired,
	handleChange: PropTypes.func,
	data: PropTypes.arrayOf(propTypesConst.selectItem),
};

CustomSelect.defaultProps = {
	data: null,
	handleChange: () => {},
};

export default CustomSelect;
