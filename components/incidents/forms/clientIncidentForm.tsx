'use client';
import {
	Button,
	FileInput,
	Label,
	Select,
	Spinner,
	Textarea,
} from 'flowbite-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'animate.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const validationSchema = Yup.object({
	incidentType: Yup.string().required('Please select an incident type'),
	description: Yup.string().required('Please include a description'),
});

const ClientIncidentForm = () => {
	const { data: session } = useSession();
	const [showThankYouMessage, setShowThankYouMessage] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);

	interface InitialValues {
		incidentType: string;
		description: string;
		images: any;
	}

	const initialValues: InitialValues = {
		incidentType: '',
		description: '',
		images: undefined,
	};

	const formik = useFormik({
		initialValues,
		onSubmit: async function (values) {
			const data = {
				type: values.incidentType,
				description: values.description,
				users_permissions_user: {
					id: session?.user.id,
				},
			};

			const formData = new FormData();
			formData.append('data', JSON.stringify(data));

			for (let i = 0; i < values.images.length; i++) {
				formData.append('files.images', values.images[i]);
			}

			await fetch('http://139.162.98.214:1337/api/incidents', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${session?.user?.jwt ?? ''}`,
				},
			})
				.then((res) => {
					if (res.status === 200) {
						setShowThankYouMessage(true);
						formik.resetForm();
					} else {
						setShowErrorMessage(true);
					}
				})
				.catch((err) => {
					console.error(err);
					setShowErrorMessage(true);
				});
		},

		validationSchema,
		validateOnBlur: true,
		validateOnMount: true,
	});

	if (showThankYouMessage) {
		return (
			<div className='grid gap-5 border border-cyan-700 p-10 lg:w-[50%] mx-auto rounded-md shadow-lg bg-[rgba(255,255,255,0.7)] backdrop-blur-lg panimate__animated animate__fadeInUp animate__faster'>
				<h2 className='text-2xl text-center text-cyan-900 font-bold'>
					Thank You!!!
				</h2>
				<p className='text-center'>
					Thank you for your submission, we have received your
					incident. One of our qualified agents will attend to this as
					soon as possible. If you want to submit another incident,
					please click the button below
				</p>
				<div className='grid mt-5'>
					<Button onClick={() => setShowThankYouMessage(false)}>
						Submit another incident
					</Button>
				</div>
			</div>
		);
	}

	if (showErrorMessage) {
		return (
			<div className='grid gap-5 border border-cyan-700 p-10 lg:w-[50%] mx-auto rounded-md shadow-lg bg-[rgba(255,255,255,0.7)] backdrop-blur-lg panimate__animated animate__fadeInUp animate__faster'>
				<h2 className='text-2xl text-center text-cyan-900 font-bold'>
					Oops...
				</h2>
				<p className='text-center'>
					Something went wrong while submitting this incident. Please
					check your internet connection or try again later.
				</p>
				<div className='grid mt-5'>
					<Button onClick={() => setShowErrorMessage(false)}>
						Try again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className='border border-cyan-700 p-10 lg:w-[50%] mx-auto rounded-md shadow-lg bg-[rgba(255,255,255,0.7)] backdrop-blur-lg panimate__animated animate__fadeInUp animate__faster'>
			<form
				className='grid gap-5'
				onSubmit={formik.handleSubmit}
			>
				<div className='grid gap-2'>
					<h2 className='text-2xl text-cyan-900 font-bold'>
						Report an incident
					</h2>
				</div>
				<div className='mt-5'>
					<Label>
						Incident type
						<Select
							name='incidentType'
							value={formik.values.incidentType}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							color={
								formik.touched.incidentType &&
								formik.errors.incidentType
									? 'failure'
									: 'gray'
							}
							helperText={
								formik.touched.incidentType &&
								formik.errors.incidentType
							}
							theme={{
								field: {
									select: {
										base: 'border-2 border-cyan-500',
									},
								},
							}}
						>
							<option value=''>
								--Select an incident type--
							</option>
							<option>Crime</option>
							<option>Maintenance</option>
						</Select>
					</Label>
				</div>

				<div>
					<Label>
						Description
						<Textarea
							name='description'
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							color={
								formik.touched.description &&
								formik.errors.description
									? 'failure'
									: 'gray'
							}
							helperText={
								formik.touched.description &&
								formik.errors.description
							}
							rows={4}
						/>
					</Label>
				</div>

				<div>
					<Label>
						Images
						<FileInput
							name='images'
							multiple
							onChange={(e) => {
								formik.setFieldValue('images', e.target.files);
							}}
							onBlur={formik.handleBlur}
							color={'white'}
							helperText=''
							id='file'
							className='border border-cyan-600 rounded-md'
						/>
					</Label>
				</div>

				<div className='mt-5 grid'>
					<Button
						type='submit'
						className='animate__animated animate__fadeInUp animate__slow'
						disabled={formik.isSubmitting}
					>
						<span className='flex gap-3 items-center'>
							<span>Submit Incident</span>{' '}
							{formik.isSubmitting && <Spinner size={'sm'} />}
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ClientIncidentForm;
