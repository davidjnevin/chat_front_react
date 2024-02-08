import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid'
import * as yup from 'yup';
import { Formik, Form, Field, } from 'formik';

const url = 'http://127.0.0.1:8000/clean/cleanings/'


const ChatIdInputSchema = yup.object().shape({
	requestedId: yup.string().required('Please enter a chat ID'),
});


interface ChatIdInput extends yup.InferType<typeof ChatIdInputSchema> {
	requestedId: string;
}

const GetCleaningById = () => {

	const initialValues: ChatIdInput = { requestedId: '' };
	const [cleanChat, setCleanChat] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const fetchCleaningById = async (requestedId: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response: AxiosResponse = await axios.get(
				url + requestedId,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			(response.data.result === "Not found")
				? setCleanChat('No chat found\n')
				: setCleanChat(response.data.result.cleaned_chat);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="card">
			{error ? (
				<p>Oops there was an error: {error.message}</p>
			) : (
				<div>
					<Formik
						initialValues={initialValues}
						validationSchema={ChatIdInputSchema}
						onSubmit={(values, actions) => {
							console.log({ values, actions });
							fetchCleaningById(values.requestedId);
						}}
						onReset={(values, actions) => {
							console.log({ values, actions });
							setCleanChat('');
							setIsLoading(false);
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<div className="input-container">
									<label htmlFor="chatIdInput">Enter chat ID</label>
									<Field id="chatIdInput" name="requestedId" placeholder="" />
									{errors.requestedId && touched.requestedId ? (
										<div className="input-error">{errors.requestedId}</div>
									) : null}
									<div className="button-group">
										<button type="submit">Fetch</button>
										<button type="reset">Cancel</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
					{isLoading && <p>Loading...</p>}
					<div>
						{(cleanChat !== '') && (cleanChat.split('\n').map((line) => <p key={nanoid()}>{line}</p>))
						}
					</div>
				</div>
			)}
		</div>
	);
};


export default GetCleaningById;
