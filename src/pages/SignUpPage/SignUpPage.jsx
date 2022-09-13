import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryForm } from 'Components/ui/form/PrimaryForm/PrimaryForm';
import { PrimaryInput } from 'Components/ui/input/PrimaryInput/PrimaryInput';
import { SubmitInput } from 'Components/ui/input/SubmitInput/SubmitInput';
import { errMessages, regEmail, regPass } from 'Utils/constants';
import { useAuth } from 'Hooks/useAuth';
import { addUser } from 'Redux/slices/userSlice';

export const SignUpPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const { users } = useAuth();

	const onSubmit = async (data) => {
		const newData = {
			...data,
			id: uuidv4(),
			role: 'Пользователь',
			interviews: 0,
			date: new Date(Date.now()).toLocaleDateString(),
		};
		dispatch(addUser(newData));

		navigate('/', { replace: true });
		reset();
	};

	return (
		<PrimaryForm
			title="Регистрация"
			handleSubmit={() => handleSubmit(onSubmit)}
		>
			<PrimaryInput
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
			<PrimaryInput
				type="text"
				name="email"
				placeholder="Enter your email..."
				autoComplete="on"
				register={register}
				rules={{
					required: errMessages.notEmptyField,
					pattern: { value: regEmail, message: errMessages.emailErr },
					validate: (value) => {
						const checkUserEmail = users.find((user) => user.email === value);
						return !checkUserEmail || errMessages.emailUniqueErr;
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
					minLength: { value: 8, message: errMessages.minLength.password },
					maxLength: { value: 15, message: errMessages.maxLength.password },
					pattern: { value: regPass, message: errMessages.passErr },
				}}
				errors={errors}
			/>
			<PrimaryInput
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
		</PrimaryForm>
	);
};
