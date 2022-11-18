import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PrimaryInput } from 'Components/ui/input/PrimaryInput/PrimaryInput';
import { SubmitInput } from 'Components/ui/input/SubmitInput/SubmitInput';
import { PrimaryForm } from 'Components/ui/form/PrimaryForm/PrimaryForm';
import { getFromLSByKey, updateDataInLS } from 'Utils/funcForLSByKey';
import './LogInPage.scss';

const LogInPage = () => {
	const navigate = useNavigate();

	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
	});

	const users = getFromLSByKey('users');

	const onSubmit = (data) => {
		const currentUser = users.find((user) => user.email === data.email);

		const updatedUser = { ...currentUser, isAuth: true };
		updateDataInLS('users', updatedUser);

		navigate('/home', { replace: true });

		reset();
	};

	return (
		<PrimaryForm
			title={t('logInForm.title')}
			handleSubmit={() => handleSubmit(onSubmit)}
		>
			<PrimaryInput
				type="text"
				name="email"
				placeholder={t('logInForm.enterEmail')}
				autoComplete="on"
				register={register}
				rules={{
					required: t('validationErrMessages.notEmptyField'),
					validate: (value) => {
						const currentUser = users?.find((user) => user.email === value);
						return currentUser || t('validationErrMessages.incorrectEmail');
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
					validate: (value) => {
						const currentUser = users?.find(
							(user) => user.email === getValues('email')
						);
						return (
							(currentUser && currentUser.password === value) ||
							t('validationErrMessages.incorrectPass')
						);
					},
				}}
				errors={errors}
			/>

			<div className="login__form_help-block">
				<Link className="link_black" to="/signup">
					{t('signUpForm.title')}
				</Link>
				<a className="link_black disabled_item" href="/">
					{t('logInForm.forgotPass')}
				</a>
			</div>

			<SubmitInput isValid={isValid} />
		</PrimaryForm>
	);
};

export default LogInPage;
