import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export const Form = ({ children, title, handleSubmit, onSubmit }) => (
	<section className="form__wrapper">
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="form__title">{title}</h2>
			{children}
		</form>
	</section>
);

Form.propTypes = {
	title: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
};

Form.defaultProps = {
	onSubmit: undefined,
};
