import React from 'react';

export const StyleButton = ({ label, active, style, onToggle }) => {
	let cls = 'RichEditor-styleButton';
	if (active) {
		cls += ' RichEditor-activeButton';
	}

	const handleToggle = (e) => {
		e.preventDefault();
		onToggle(style);
	};

	return (
		<span className={cls} onMouseDown={handleToggle}>
			{label}
		</span>
	);
};
