'use client';

import { Button } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
	const pagePath: string = usePathname();

	return (
		<>
			<Button
				color='gray'
				size={'xs'}
				onClick={() => signOut()}
				className='shadow'
			>
				Log Out
			</Button>
		</>
	);
};

export default LogoutButton;
