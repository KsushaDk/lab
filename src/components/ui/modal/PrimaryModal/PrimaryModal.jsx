import React from 'react';
import PropTypes from 'prop-types';
import { useModal } from 'Hooks/useModal';
import { Portal } from '../../portal/Portal';
import './PrimaryModal.scss';

export const PrimaryModal = ({ children, handleModalClick }) => {
	const { modal } = useModal();

	const wrapperModalStyle = modal.isActive
		? 'primary_modal__wrapper active_modal'
		: 'primary_modal__wrapper';

	const contentModalStyle = modal.isActive
		? 'primary_modal__content active_modal-content'
		: 'primary_modal__content';

	return (
		<div>
			{modal.isActive && (
				<Portal>
					<div
						className={wrapperModalStyle}
						onClick={(e) => handleModalClick(e)}
					>
						<div
							className={contentModalStyle}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="primary_modal__head">
								<div className="primary_modal__title">{modal.message}</div>
							</div>

							<div className="primary_modal__body">{children}</div>

							<div className="primary_modal__footer">
								{modal.btnValues.map((btnValue) => (
									<button
										key={btnValue}
										className="primary_btn"
										type="button"
										value={btnValue}
										onClick={(e) => handleModalClick(e)}
									>
										{btnValue}
									</button>
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
