import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../portal/Portal';
import './PrimaryModal.scss';

export const PrimaryModal = ({
	title,
	isActive,
	onCancel,
	onSubmit,
	children,
}) => {
	const wrapperModalStyle = isActive
		? 'primary_modal__wrapper active_modal'
		: 'primary_modal__wrapper';

	const contentModalStyle = isActive
		? 'primary_modal__content active_modal-content'
		: 'primary_modal__content';

	return (
		<div>
			{isActive && (
				<Portal>
					<div className={wrapperModalStyle} onClick={onCancel}>
						<div
							className={contentModalStyle}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="primary_modal__head">
								<div className="primary_modal__title">{title}</div>
							</div>

							<div className="primary_modal__body">{children}</div>

							<div className="primary_modal__footer">
								{title.includes('пустым') || title.includes('уникальным') ? (
									<button
										className="primary_btn"
										type="submit"
										onClick={onCancel}
									>
										Ok
									</button>
								) : (
									<>
										<button
											className="primary_btn"
											type="submit"
											onClick={onSubmit}
										>
											Сохранить
										</button>
										<button
											className="primary_btn"
											type="button"
											onClick={onCancel}
										>
											Отмена
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
};

PrimaryModal.propTypes = {
	title: PropTypes.string,
	isActive: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	children: PropTypes.node,
};

PrimaryModal.defaultProps = {
	title: PropTypes.undefined,
	isActive: false,
	onCancel: () => {},
	onSubmit: () => {},
	children: null,
};
