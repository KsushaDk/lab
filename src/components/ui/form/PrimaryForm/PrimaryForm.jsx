import React from 'react';
import PropTypes from 'prop-types';
import './PrimaryForm.scss';

export const PrimaryForm = ({ children, title, handleSubmit, onSubmit }) => (
	<section className="primary_form__wrapper">
		<form className="primary_form__inner" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="title_s">{title}</h2>
			{children}
		</form>
	</section>
);

PrimaryForm.propTypes = {
	title: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
};

PrimaryForm.defaultProps = {
	onSubmit: () => {},
};
