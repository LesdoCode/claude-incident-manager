import ClientIncidentForm from '@/components/incidents/forms/clientIncidentForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();
	if (!session?.user) redirect('/auth/login');

	return (
		<div className='mt-14'>
			<ClientIncidentForm />
		</div>
	);
}
