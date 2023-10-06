'use client';

import { Button } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const SignInButton = () => {
	const pagePath: string = usePathname();

	return (
		<>
			{pagePath !== '/auth/login' && (
				<Button
					size={'xs'}
					href='/auth/login'
					color='gray'
				>
					Login
				</Button>
			)}
		</>
	);
};

export default SignInButton;
