import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCaretDownFill } from 'react-icons/bs';
import { TableIcon } from './TableIcon';

export const TableDropMenu = () => {
	const [isShown, setShown] = useState(false);

	const handleDropMenu = () => {
		setShown((prevState) => !prevState);
	};

	return (
		<div
			className="dropdown"
			role="button"
			tabIndex={0}
			onClick={() => handleDropMenu()}
			onMouseLeave={() => setShown(false)}
		>
			<TableIcon btnIcon={<BsCaretDownFill />} />

			{isShown && (
				<div className="dropdown_content">
					<Link to="/home/create">Copy</Link>
					<Link to="/home/create">Play/Resume</Link>
				</div>
			)}
		</div>
	);
};
