import { APP_NAME } from '@/helpers/consstants';
import { getServerSession } from 'next-auth';
import React from 'react';
import SignInButton from './signInButton';
import RegisterButton from './registerButton';
import LogoutButton from './logoutButton';
import { authOptions } from '@/helpers/auth/authOptions';

const AppBar = async () => {
	const session = await getServerSession(authOptions);
	// const pagePath: string = usePathname();

	return (
		<nav className='p-5 border shadow-md bg-[rgba(255,255,255,0.7)] backdrop-blur'>
			<div className='flex items-center justify-between'>
				<span>{APP_NAME}</span>

				<div className='flex items-center gap-3'>
					{!session && (
						<>
							<RegisterButton />
							<SignInButton />
						</>
					)}

					{session && (
						<>
							<p>{session?.user?.email}</p>
							<LogoutButton />
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default AppBar;
