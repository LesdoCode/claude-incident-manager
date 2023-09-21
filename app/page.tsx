'use client';
import ClientIncidentForm from '@/components/incidents/forms/clientIncidentForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Home() {
	const { data } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/auth/login');
		},
	});

	return (
		<div className='mt-14'>
			<ClientIncidentForm />
		</div>
	);
}
