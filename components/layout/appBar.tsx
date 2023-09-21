'use client';
import { Button } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const AppBar = () => {
	const { data: session } = useSession();

	console.log(session);
	return (
		<nav className='p-5 border shadow-md bg-[rgba(255,255,255,0.7)] backdrop-blur'>
			<div className='flex items-center justify-between'>
				<h1>Claude Incident Manager</h1>

				<div className='flex items-center gap-3'>
					{!session && (
						<>
							<Button
								className=''
								size={'xs'}
								href='/auth/register'
							>
								Register
							</Button>
							<Button
								color='gray'
								size={'xs'}
								href='/auth/login'
							>
								Login
							</Button>
						</>
					)}

					{session && (
						<>
							<p>{session.user.email}</p>
							<Button
								color='gray'
								size={'xs'}
								onClick={() => signOut()}
								className='shadow'
							>
								Log Out
							</Button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default AppBar;
