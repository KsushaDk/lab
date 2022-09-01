import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Error } from '../../components/Error/Error';
import { errMessages } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';

import './LogInPage.scss';

export const LogInPage = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const [matchErr, setMatchErr] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});
	console.log(isValid);
	const onSubmit = async (data) => {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		const currentUser = users.find((user) => user.email === data.email);

		if (currentUser !== undefined && currentUser.password === data.password) {
			signup(currentUser, () => navigate('/home', { replace: true }));
		} else {
			setMatchErr('Password or email has incorrect value');
		}

		reset();
	};

	return (
		<section className="login">
			<form className="login__form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="login__form_title">Вход</h2>
				{!!matchErr && <Error err={matchErr} />}
				{errors?.email && <Error err={errors?.email?.message || 'error'} />}
				<input
					className="login__form_input"
					placeholder="Enter your email..."
					{...register('email', {
						required: errMessages.notEmptyField,
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
