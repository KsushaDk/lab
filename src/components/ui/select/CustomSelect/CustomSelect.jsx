import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsChevronUp, BsChevronDown, BsX } from 'react-icons/bs';
import { useDebounce } from 'Hooks/useDebounce';
import { removeItemByQuery } from 'Utils/removeItemByQuery';
import { Loader } from '../../../Loader/Loader';
import { IconBtn } from '../../button/IconBtn/IconBtn';
import { CheckboxInput } from '../../input/CheckboxInput/CheckboxInput';
import './CustomSelect.scss';

export const CustomSelect = ({ data, multi }) => {
	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedID, setSelectedID] = useState([]);

	const debouncedSearch = useDebounce(search, 500);

	const toggleOption = () => {
		setIsOptionOpen((prevState) => !prevState);
	};

	const handleChangeInput = (e) => {
		setSelectedOptions([]);
		setSearch(e.target.value);
	};

	const handleSingleSelection = (selected) => {
		setSelectedOptions([selected]);
		setIsOptionOpen(false);
	};

	const removeSelectedOption = (e, id) => {
		e.stopPropagation();
		const newSelectedOptions = removeItemByQuery(selectedOptions, id);
		setSelectedOptions(newSelectedOptions);
	};

	const handleChangeOption = (e) => {
		e.stopPropagation();

		if (selectedID.includes(+e.target.id)) {
			removeSelectedOption(e, +e.target.id);
		} else {
			const selected = options.find((option) => +option.id === +e.target.id);

			multi
				? setSelectedOptions([...selectedOptions, selected])
				: handleSingleSelection(selected);
		}
	};

	useEffect(() => {
		setIsLoading(true);

		if (debouncedSearch.trim() === '') {
			setOptions(data);
		}

		const searchResult = data.filter((option) =>
			option.title.includes(debouncedSearch)
		);

		searchResult === undefined ? setOptions([]) : setOptions(searchResult);

		setIsLoading(false);
	}, [debouncedSearch]);

	useEffect(() => {
		const selected = selectedOptions.map((option) => option.id);
		setSelectedID(selected);
	}, [selectedOptions]);

	useEffect(() => {
		setOptions(data);
	}, [data]);

	return (
		<div className="select__wrapper" onClick={toggleOption}>
			<div className="select__header">
				{multi ? (
					<div className="select__header_input-multi">
						{selectedOptions.map((option) => (
							<div className="input-multi_item" key={option.id}>
								<span>{option.title}</span>
								<IconBtn
									btnIcon={<BsX />}
									className="icon_white"
									handleClick={(e) => removeSelectedOption(e, option.id)}
								/>
							</div>
						))}
					</div>
				) : (
					<input
						className="select__header_input"
						type="text"
						onChange={handleChangeInput}
						placeholder="Search..."
						value={selectedOptions[0]?.title || search || ''}
					/>
				)}
				<IconBtn btnIcon={isOptionOpen ? <BsChevronUp /> : <BsChevronDown />} />
			</div>

			{isOptionOpen && (
				<div className="select__content" onClick={(e) => handleChangeOption(e)}>
					{isLoading ? (
						<Loader />
					) : (
						<ul className="select__options">
							{options.length === 0 && (
								<li className="select__option">
									No such item. Please try again.
								</li>
							)}
							{options.map((option) => (
								<li
									className={
										selectedID.includes(option.id)
											? 'select__option selected'
											: 'select__option'
									}
									key={option.id}
									id={option.id}
								>
									{multi ? (
										<CheckboxInput
											selectedID={selectedID}
											option={option}
											handleCheckbox={handleChangeOption}
										/>
									) : (
										option.title
									)}
								</li>
							))}
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
