import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCaretDownFill } from 'react-icons/bs';
import { IconBtn } from '../button/IconBtn/IconBtn';

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
		>
			<IconBtn btnIcon={<BsCaretDownFill />} />

			{isShown && (
				<div className="dropdown__content">
					<Link className="dropdown__content_link" to="/home/create">
						Copy
					</Link>
					<Link className="dropdown__content_link" to="/home/create">
						Play/Resume
					</Link>
				</div>
			)}
		</div>
	);
};
