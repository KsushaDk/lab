import React from 'react';
import './SearchInput.scss';

export const SearchInput = () => (
	<form className="search__form">
		<div className="search_icon" />
		<input type="text" placeholder="Search..." />
		<div className="reset_icon" />
	</form>
);
