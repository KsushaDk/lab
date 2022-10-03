import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsChevronUp, BsChevronDown, BsX } from 'react-icons/bs';
import { useDebounce } from 'Hooks/useDebounce';
import { getNextElem } from 'Utils/getNextElem';
import { getSearchResult } from 'Utils/getSearchResult';
import { toggleValueByKey } from 'Utils/toggleValueByKey';
import { findInArrByID } from 'Utils/findInArrByID';
import { Loader } from '../../../Loader/Loader';
import { IconBtn } from '../../button/IconBtn/IconBtn';
import { CheckboxInput } from '../../input/CheckboxInput/CheckboxInput';
import './CustomSelect.scss';

export const CustomSelect = ({ data, multi }) => {
	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [search, setSearch] = useState('');

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

	const handleKeyDownOption = (e) => {
		if (e.key === 'Enter') {
			handleChangeOption(e);
		} else {
			const nextEl = getNextElem(e.key, e.target.id);
			nextEl.focus();
		}
	};

	useEffect(() => {
		setIsLoading(true);

		const searchResult = getSearchResult(data, debouncedSearch, 'title');
		setOptions(searchResult);

		setIsLoading(false);
	}, [debouncedSearch]);

	useEffect(() => {
		const updatedOptions = data.map((option) => {
			option.checked = false;
			return option;
		});

		setOptions(updatedOptions);
	}, [data]);

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
											className="icon_white"
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
					{isLoading ? (
						<Loader />
					) : (
						<ul className="select__options" role="menu">
							{options.length === 0 ? (
								<li className="select__option">
									No such item. Please try again.
								</li>
							) : (
								options.map((option) => (
									<li
										className={
											option.checked
												? 'select__option selected'
												: 'select__option'
										}
										key={option.id}
										id={option.id}
										role="menuitem"
										tabIndex={0}
										onKeyDown={handleKeyDownOption}
										onClick={handleChangeOption}
									>
										{multi ? <CheckboxInput option={option} /> : option.title}
									</li>
								))
							)}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

CustomSelect.propTypes = {
	multi: PropTypes.bool.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			userId: PropTypes.number,
			id: PropTypes.number,
			title: PropTypes.string,
			completed: PropTypes.bool,
		}).isRequired
	),
};

CustomSelect.defaultProps = {
	data: null,
};
