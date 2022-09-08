import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormInput } from 'Components/ui/input/FormInput/FormInput';
import { SubmitInput } from 'Components/ui/input/SubmitInput/SubmitInput';
import { Form } from 'Components/ui/form/Form';
import { errMessages } from 'Utils/constants';
import { useAuth } from 'Hooks/useAuth';
import './LogInPage.scss';

export const LogInPage = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const users = JSON.parse(localStorage.getItem('users')) || [];

	const onSubmit = (data) => {
		const currentUser = users.find((user) => user.email === data.email);
		signup(currentUser, () => navigate('/home', { replace: true }));

		reset();
	};

	return (
		<Form title="Вход" handleSubmit={() => handleSubmit(onSubmit)}>
			<FormInput
				type="text"
				name="email"
				placeholder="Enter your email..."
				autoComplete="on"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					validate: (value) => {
						const currentUser = users.find((user) => user.email === value);
						return currentUser || errMessages.incorrectEmail;
					},
				}}
				errors={errors}
			/>
			<FormInput
				type="password"
				name="password"
				placeholder="Enter your password..."
				autoComplete="off"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					validate: (value) => {
						const currentUser = users.find(
							(user) => user.email === getValues('email')
						);
						return (
							(currentUser && currentUser.password === value) ||
							errMessages.incorrectPass
						);
					},
				}}
				errors={errors}
			/>

			<div className="login__form_check">
				<Link to="/signup">Регистрация</Link>
				<a href="/">Забыли пароль?</a>
			</div>

			<SubmitInput isValid={isValid} />
		</Form>
	);
};
