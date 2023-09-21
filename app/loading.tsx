'use client';

import { Spinner } from 'flowbite-react';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className='fixed inset-0 bg-[rgba(0,0,0,0,7)] backdrop-blur-sm grid place-items-center'>
			<Spinner size={'2xl'} />
		</div>
	);
}
