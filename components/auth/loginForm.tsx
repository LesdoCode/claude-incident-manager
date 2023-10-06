'use client';
import { loginFormValidationSchema } from '@/helpers/auth/formSchemas';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface LoginDTO {
	email: string;
	password: string;
}

async function handleFormSubmit(values: LoginDTO) {
	const credentials = {
		email: values.email,
		password: values.password,
	};

	const response = await signIn('credentials', {
		...credentials,
		callbackUrl: '/',
		redirect: true,
	});

	console.log(response);
}

const LoginForm = () => {
	const initialValues: LoginDTO = {
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validateOnBlur: true,
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: loginFormValidationSchema,
	});

	return (
		<section className='lg:w-[40%] w-full mx-auto mt-10'>
			<form
				onSubmit={formik.handleSubmit}
				className='shadow-md p-10 rounded-lg border border-cyan-300  bg-[rgba(255,255,255,0.5)] backdrop-blur'
			>
				<h2 className='text-xl text-center text-cyan-800'>
					Sign in to your account
				</h2>

				<div className='grid gap-5 mt-10 text-xs'>
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
				</div>

				<div className='grid gap-3 mt-5'>
					<Button
						size={'sm'}
						className='hover:shadow-lg transition'
						disabled={
							!!formik.errors.email || !!formik.errors.password
						}
						type='submit'
					>
						<div className='flex items-center gap-3'>
							<span>Get Started</span>
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
						Don&apos;t have an account?{' '}
						<Link
							href='/auth/register'
							color='gray'
							className='underline py-3'
						>
							Register
						</Link>
					</p>
				)}
			</form>

			<p className='text-xs text-center mt-10 px-7 text-gray-500'>
				By logging in and using this platform, you are agreeing to our
				terms of service and privacy policy
			</p>
		</section>
	);
};

export default LoginForm;
