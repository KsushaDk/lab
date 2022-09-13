import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PrimaryInput } from 'Components/ui/input/PrimaryInput/PrimaryInput';
import { SubmitInput } from 'Components/ui/input/SubmitInput/SubmitInput';
import { PrimaryForm } from 'Components/ui/form/PrimaryForm/PrimaryForm';
import { errMessages } from 'Utils/constants';
import { useAuth } from 'Hooks/useAuth';
import { loginUser } from 'Redux/slices/userSlice';
import './LogInPage.scss';

export const LogInPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const { users } = useAuth();

	const onSubmit = (data) => {
		const currentUser = users.find((user) => user.email === data.email);

		const newUser = { ...currentUser, isAuth: true };
		dispatch(loginUser(newUser));

		navigate('/home', { replace: true });

		reset();
	};

	return (
		<PrimaryForm title="Вход" handleSubmit={() => handleSubmit(onSubmit)}>
			<PrimaryInput
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
			<PrimaryInput
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

			<div className="login__form_help-block">
				<Link to="/signup">Регистрация</Link>
				<a href="/">Забыли пароль?</a>
			</div>

			<SubmitInput isValid={isValid} />
		</PrimaryForm>
	);
};
