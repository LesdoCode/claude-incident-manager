'use client';

import LoginForm from '@/components/auth/loginForm';
import RegisterForm from '@/components/auth/registerForm';

export default function Page() {
	return (
		<>
			<LoginForm />
		</>
	);
}

export const revalidate = 2;
