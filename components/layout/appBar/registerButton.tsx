'use client';

import { Button } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const RegisterButton = () => {
	const pagePath: string = usePathname();

	return (
		<>
			{pagePath !== '/auth/register' && (
				<Button
					className=''
					size={'xs'}
					href='/auth/register'
				>
					Register
				</Button>
			)}
		</>
	);
};

export default RegisterButton;
