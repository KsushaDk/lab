import React from 'react';
import PropTypes from 'prop-types';
import { useModal } from 'Hooks/useModal';
import { Portal } from '../../portal/Portal';
import './PrimaryModal.scss';

const SecondaryBtn = React.lazy(() =>
	import('../../button/SecondaryBtn/SecondaryBtn')
);

const PrimaryModal = ({ children, handleModalClick }) => {
	const { modal } = useModal();

	const wrapperModalStyle = modal.isActive
		? 'primary_modal__wrapper active_modal'
		: 'primary_modal__wrapper';

	return (
		<div>
			{modal.isActive && (
				<Portal>
					<div
						className={wrapperModalStyle}
						onClick={(e) => handleModalClick(e)}
					>
						<div
							className="primary_modal__content"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="primary_modal__head">
								<div className="primary_modal__title">{modal.message}</div>
							</div>

							<div className="primary_modal__body">{children}</div>

							<div className="primary_modal__footer">
								{modal.btnValues.map((btnValue) => (
									<SecondaryBtn
										key={btnValue}
										btnValue={btnValue}
										value={btnValue}
										onClick={handleModalClick}
									/>
								))}
							</div>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
};

PrimaryModal.propTypes = {
	children: PropTypes.node,
	handleModalClick: PropTypes.func,
};

PrimaryModal.defaultProps = {
	children: null,
	handleModalClick: () => {},
};

export default PrimaryModal;
