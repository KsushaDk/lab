import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryForm } from 'Components/ui/form/PrimaryForm/PrimaryForm';
import { PrimaryInput } from 'Components/ui/input/PrimaryInput/PrimaryInput';
import { SubmitInput } from 'Components/ui/input/SubmitInput/SubmitInput';
import { regEmail, regPass } from 'Constants/constants';
import { useUsers } from 'Hooks/useUsers';
import { addUser } from 'Redux/slices/userSlice';

export const SignUpPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const { users } = useUsers();

	const onSubmit = async (data) => {
		const newData = {
			...data,
			id: uuidv4(),
			role: 'Пользователь',
			interviews: 0,
			registered: new Date(Date.now()).toLocaleDateString(),
		};
		dispatch(addUser(newData));

		navigate('/', { replace: true });
		reset();
	};

	return (
		<PrimaryForm
			title={t('signUpForm.title')}
			handleSubmit={() => handleSubmit(onSubmit)}
		>
			<PrimaryInput
				type="text"
				name="username"
				placeholder={t('signUpForm.enterUsername')}
				autoComplete="on"
				register={register}
				rules={{
					required: t('validationErrMessages.notEmptyField'),
					minLength: {
						value: 4,
						message: t('validationErrMessages.minLength.username'),
					},
					maxLength: {
						value: 20,
						message: t('validationErrMessages.maxLength.username'),
					},
				}}
				errors={errors}
			/>
			<PrimaryInput
				type="text"
				name="email"
				placeholder={t('logInForm.enterEmail')}
				autoComplete="on"
				register={register}
				rules={{
					required: t('validationErrMessages.notEmptyField'),
					pattern: {
						value: regEmail,
						message: t('validationErrMessages.emailErr'),
					},
					validate: (value) => {
						const checkUserEmail = users.find((user) => user.email === value);
						return !checkUserEmail || t('validationErrMessages.emailUniqueErr');
					},
				}}
				errors={errors}
			/>
			<PrimaryInput
				type="password"
				name="password"
				placeholder={t('logInForm.enterPass')}
				autoComplete="off"
				register={register}
				rules={{
					required: t('validationErrMessages.notEmptyField'),
					minLength: {
						value: 8,
						message: t('validationErrMessages.minLength.password'),
					},
					maxLength: {
						value: 15,
						message: t('validationErrMessages.maxLength.password'),
					},
					pattern: {
						value: regPass,
						message: t('validationErrMessages.passErr'),
					},
				}}
				errors={errors}
			/>
			<PrimaryInput
				type="password"
				name="password_repeat"
				placeholder={t('signUpForm.repeatPass')}
				autoComplete="off"
				register={register}
				rules={{
					required: t('validationErrMessages.notEmptyField'),
					validate: (value) =>
						value === watch('password') ||
						t('validationErrMessages.notMatchPass'),
				}}
				errors={errors}
			/>
			<SubmitInput isValid={isValid} />
		</PrimaryForm>
	);
};
