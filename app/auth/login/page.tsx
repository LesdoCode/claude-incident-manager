import LoginForm from '@/components/auth/loginForm';
import { authOptions } from '@/helpers/auth/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
	const session = await getServerSession(authOptions);
	if (session?.user) redirect('/');

	return (
		<>
			<LoginForm />
		</>
	);
}
