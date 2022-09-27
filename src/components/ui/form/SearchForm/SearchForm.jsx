import React, { useState } from 'react';
import { BsSearch, BsXCircle } from 'react-icons/bs';
import { IconBtn } from '../../button/IconBtn/IconBtn';
import './SearchForm.scss';

export const SearchForm = ({ handleSubmit }) => {
	const [query, setQuery] = useState('');

	return (
		<form className="search_form" onSubmit={handleSubmit}>
			<IconBtn type="submit" btnIcon={<BsSearch />} />
			<input
				className="search_form_field"
				type="text"
				name="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<IconBtn
				type="submit"
				btnIcon={<BsXCircle />}
				handleClick={() => setQuery('')}
			/>
		</form>
	);
};
