import React, { useState } from 'react';
import { BsSearch, BsXCircle } from 'react-icons/bs';
import './SearchInput.scss';

export const SearchInput = ({ handleSubmit }) => {
	const [query, setQuery] = useState('');

	return (
		<form className="search__form" onSubmit={handleSubmit}>
			<button className="search_icon " type="submit">
				<BsSearch />
			</button>
			<input
				type="text"
				name="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button
				className="search_icon "
				type="submit"
				onClick={() => setQuery('')}
			>
				<BsXCircle />
			</button>
		</form>
	);
};
