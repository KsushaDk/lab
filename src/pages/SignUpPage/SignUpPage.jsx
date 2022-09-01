import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components/Error/Error';
import { errMessages, regEmail } from '../../utils/constants';

import './SignUpPage.scss';

export const SignUpPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const onSubmit = async (data) => {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		users.push(data);
		localStorage.setItem('users', JSON.stringify(users));

		navigate('/', { replace: true });
		reset();
	};

	return (
		<section className="signup">
			<form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="signup__form_title">Регистрация</h2>
				{errors?.username && (
					<Error err={errors?.username?.message || 'error'} />
				)}
				<input
					className="signup__form_input"
					placeholder="Enter your name..."
					{...register('username', {
						required: errMessages.notEmptyField,
						minLength: { value: 4, message: errMessages.minLength.username },
						maxLength: { value: 20, message: errMessages.maxLength.username },
					})}
				/>
				{errors?.email && <Error err={errors?.email?.message || 'error'} />}
				<input
					className="signup__form_input"
					placeholder="Enter your email..."
					{...register('email', {
						required: errMessages.notEmptyField,
						pattern: { value: regEmail, message: errMessages.emailErr },
					})}
				/>
				{errors?.password && (
					<Error err={errors?.password?.message || 'error'} />
				)}
				<input
					className="signup__form_input"
					type="password"
					placeholder="Enter your password..."
					{...register('password', {
						required: errMessages.notEmptyField,
						minLength: { value: 8, message: errMessages.minLength.password },
						maxLength: { value: 15, message: errMessages.maxLength.password },
					})}
				/>
				{errors?.password_repeat && (
					<Error err={errors?.password_repeat?.message || 'error'} />
				)}
				<input
					className="signup__form_input"
					type="password"
					placeholder="Repeat your password..."
					{...register('password_repeat', {
						required: errMessages.notEmptyField,
						validate: (value) =>
							value === watch('password') || errMessages.notMatchPass,
					})}
				/>

				<input
					className="signup__form_submit"
					type="submit"
					disabled={!isValid}
				/>
			</form>
		</section>
	);
};
