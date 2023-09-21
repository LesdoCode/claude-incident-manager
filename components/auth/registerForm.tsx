import { registerFormValidationSchema } from '@/helpers/auth/formSchemas';
import { CMS_URL } from '@/helpers/consstants';

import {
	Button,
	Label,
	Spinner,
	TextInput,
	ToggleSwitch,
} from 'flowbite-react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface RegisterDTO {
	firstname: string;
	lastname: string;
	username: string | null;
	email: string;
	password: string;
	confirmPassword: string;
}

async function handleFormSubmit(values: RegisterDTO) {
	const dto = {
		firstname: values.firstname,
		lastname: values.lastname,
		username: values.email,
		email: values.email,
		password: values.password,
	};

	await fetch(`${CMS_URL}/api/auth/local/register`, {
		method: 'POST',
		body: JSON.stringify(dto),
		headers: new Headers({ 'content-type': 'application/json' }),
	}).then((res) => {
		if (res.status === 200) {
			signIn('credentials', {
				email: dto.email,
				password: dto.password,
				callbackUrl: '/',
				redirect: true,
			});
		}
	});
}

const RegisterForm = () => {
	const [agreeToTerms, setAgreeToTerms] = useState(true);

	const initialValues: RegisterDTO = {
		firstname: '',
		lastname: '',
		username: null,
		email: '',
		password: '',
		confirmPassword: '',
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validateOnBlur: true,
		validateOnMount: true,
		validationSchema: registerFormValidationSchema,
	});

	return (
		<section className='lg:w-[40%] w-full mx-auto mt-10'>
			<form
				onSubmit={formik.handleSubmit}
				className='shadow-md p-10 rounded-lg border border-cyan-300  bg-[rgba(255,255,255,0.5)] backdrop-blur'
			>
				<h2 className='text-xl text-center text-cyan-800'>
					Create an account
				</h2>

				<div className='grid gap-5 mt-5 text-xs'>
					<div className='grid grid-cols-2 gap-3'>
						<Label htmlFor='firstname'>
							First Name
							<TextInput
								name='firstname'
								value={formik.values.firstname}
								type='text'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									<label className='text-xs text-red-500 -mt-4 font-light'>
										{formik.touched.firstname &&
											formik.errors.firstname}
									</label>
								}
								style={{
									border:
										formik.touched.firstname &&
										formik.errors.firstname
											? '1px solid red'
											: '',
								}}
							/>
						</Label>

						<Label htmlFor='lastname'>
							Surname
							<TextInput
								name='lastname'
								value={formik.values.lastname}
								type='text'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									<label className='text-xs text-red-500 -mt-4 font-light'>
										{formik.touched.lastname &&
											formik.errors.lastname}
									</label>
								}
								style={{
									border:
										formik.touched.lastname &&
										formik.errors.lastname
											? '1px solid red'
											: '',
								}}
							/>
						</Label>
					</div>

					<Label htmlFor='email'>
						Email
						<TextInput
							name='email'
							value={formik.values.email}
							type='email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								<label className='text-xs text-red-500 -mt-4 font-light'>
									{formik.touched.email &&
										formik.errors.email}
								</label>
							}
							style={{
								border:
									formik.touched.email && formik.errors.email
										? '1px solid red'
										: '',
							}}
						/>
					</Label>

					<Label htmlFor='password'>
						Password
						<TextInput
							name='password'
							value={formik.values.password}
							type='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								<label className='text-xs text-red-500 -mt-4 font-light'>
									{formik.touched.password &&
										formik.errors.password}
								</label>
							}
							style={{
								border:
									formik.touched.password &&
									formik.errors.password
										? '1px solid red'
										: '',
							}}
						/>
					</Label>

					<Label htmlFor='confirmPassword'>
						Confirm Password
						<TextInput
							name='confirmPassword'
							value={formik.values.confirmPassword}
							type='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								<label className='text-xs text-red-500 -mt-4 font-light'>
									{formik.touched.confirmPassword &&
										formik.errors.confirmPassword}
								</label>
							}
							style={{
								border:
									formik.touched.confirmPassword &&
									formik.errors.confirmPassword
										? '1px solid red'
										: '',
							}}
						/>
					</Label>

					<ToggleSwitch
						checked={agreeToTerms}
						onChange={() => {
							setAgreeToTerms(!agreeToTerms);
						}}
						color='cyan'
						label='I agree to the terms of service and privacy policy'
						className='text-xs'
						theme={{
							root: {
								label: 'text-xs ml-3',
							},
						}}
					/>
				</div>

				<div className='grid gap-3 mt-10'>
					<Button
						size={'sm'}
						className='hover:shadow-lg transition'
						disabled={!agreeToTerms || formik.isSubmitting}
						type='submit'
					>
						<div className='flex items-center gap-3'>
							<span>Register</span>
							{formik.isSubmitting && (
								<Spinner
									color={'cyan'}
									size={'sm'}
								/>
							)}
						</div>
					</Button>
				</div>
				{!formik.isSubmitting && (
					<p className='mt-5 text-center text-xs'>
						Already have an account?{' '}
						<Link
							href='/auth/login'
							color='gray'
							className='underline py-3'
						>
							Log in
						</Link>
					</p>
				)}
			</form>
			<p className='text-xs text-center mt-10 px-7 text-gray-500'>
				By getting started and using this platform, you are agreeing to
				our terms of service and privacy policy
			</p>
		</section>
	);
};

export default RegisterForm;
