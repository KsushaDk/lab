import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Error } from '../../components/Error/Error';
import { admin, errMessages } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';

import './LogInPage.scss';

export const LogInPage = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const onSubmit = async (data) => {
		signup(data, () => navigate('/home', { replace: true }));
		reset();
	};

	return (
		<section className="login">
			<form className="login__form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="login__form_title">Вход</h2>

				{errors?.email && <Error err={errors?.email?.message || 'error'} />}
				<input
					className="login__form_input"
					placeholder="Enter your email..."
					{...register('email', {
						required: errMessages.notEmptyField,
						validate: (value) =>
							value === admin.email || errMessages.incorrectEmail,
					})}
				/>
				{errors?.password && (
					<Error err={errors?.password?.message || 'error'} />
				)}
				<input
					className="login__form_input"
					type="password"
					placeholder="Enter your password..."
					{...register('password', {
						required: errMessages.notEmptyField,
						validate: (value) =>
							value === admin.password || errMessages.incorrectPass,
					})}
				/>

				<div className="login__form_check">
					<Link to="/signup">Регистрация</Link>
					<a href="/">Забыли пароль?</a>
				</div>

				<input
					className="signup__form_submit"
					type="submit"
					disabled={!isValid}
				/>
			</form>
		</section>
	);
};
