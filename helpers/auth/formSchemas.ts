import * as Yup from 'yup';

export const registerFormValidationSchema = Yup.object({
	firstname: Yup.string().required().min(3).max(50),
	lastname: Yup.string().required().min(3).max(50),
	email: Yup.string().email().required(),
	password: Yup.string().min(8).max(50).required(),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('password'), ''],
		'Passwords must match'
	),
});

export const loginFormValidationSchema = Yup.object({
	email: Yup.string().email().required(),
	password: Yup.string().min(8).max(50).required(),
});
