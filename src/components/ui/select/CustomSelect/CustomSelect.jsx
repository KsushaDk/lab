import React, { useState, useEffect } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useDebounce } from 'Hooks/useDebounce';
import { Loader } from '../../../Loader/Loader';
import { IconBtn } from '../../button/IconBtn/IconBtn';

import './CustomSelect.scss';

export const CustomSelect = ({ data }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState([]);
	const [options, setOptions] = useState([]);
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 500);

	const toggleOption = () => {
		setIsOptionOpen((prevState) => !prevState);
	};

	const handleChangeInput = (e) => {
		setSelectedOption([]);
		setSearch(e.target.value);
	};

	const handleChangeOption = (e) => {
		e.stopPropagation();

		const selected = options.find((option) => +option.id === +e.target.id);

		setSelectedOption(selected);
		setSearch(selected.title);
		setIsOptionOpen(false);
	};

	useEffect(() => {
		setIsLoading(true);

		const searchResult = data.filter((option) =>
			option.title.includes(debouncedSearch)
		);

		if (debouncedSearch.trim() === '') {
			setOptions(data);
		} else if (searchResult === undefined) {
			setOptions([]);
		} else {
			setOptions(searchResult);
		}

		setIsLoading(false);
	}, [debouncedSearch]);

	useEffect(() => {
		setOptions(data);
	}, [data]);

	return (
		<div className="select__wrapper" onClick={toggleOption}>
			<div className="select__header">
				<input
					className="select__header_input"
					type="text"
					onChange={handleChangeInput}
					placeholder="Search..."
					value={selectedOption?.title || search || ''}
				/>
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
								<li className="select__option" key={option.id} id={option.id}>
									{option.title}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

CustomSelect.propTypes = {};
