'use client';
import RegisterForm from '@/components/auth/registerForm';

export default function Home() {
	return (
		<>
			<RegisterForm />
		</>
	);
}

export const revalidate = 2;
