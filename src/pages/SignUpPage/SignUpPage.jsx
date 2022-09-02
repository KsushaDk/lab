import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { errMessages, regEmail, regPass } from '../../utils/constants';
import { Form } from '../../components/ui/form/Form';
import { FormInput } from '../../components/ui/input/FormInput/FormInput';
import { SubmitInput } from '../../components/ui/input/SubmitInput/SubmitInput';

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
		<Form title="Регистрация" handleSubmit={() => handleSubmit(onSubmit)}>
			<FormInput
				type="text"
				name="username"
				placeholder="Enter your name..."
				autoComplete="on"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					minLength: { value: 4, message: errMessages.minLength.username },
					maxLength: { value: 20, message: errMessages.maxLength.username },
				}}
				errors={errors}
			/>
			<FormInput
				type="text"
				name="email"
				placeholder="Enter your email..."
				autoComplete="on"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					pattern: { value: regEmail, message: errMessages.emailErr },
					validate: (value) => {
						const users = JSON.parse(localStorage.getItem('users')) || [];
						const checkUserEmail = users.find((user) => user.email === value);
						return !checkUserEmail || errMessages.emailUniqueErr;
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
					minLength: { value: 8, message: errMessages.minLength.password },
					maxLength: { value: 15, message: errMessages.maxLength.password },
					pattern: { value: regPass, message: errMessages.passErr },
				}}
				errors={errors}
			/>
			<FormInput
				type="password"
				name="password_repeat"
				placeholder="Repeat your password..."
				autoComplete="off"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					validate: (value) =>
						value === watch('password') || errMessages.notMatchPass,
				}}
				errors={errors}
			/>
			<SubmitInput isValid={isValid} />
		</Form>
	);
};
