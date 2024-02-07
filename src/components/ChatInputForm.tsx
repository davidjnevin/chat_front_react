import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, } from 'formik';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import chatFetch from '../axios/custom';

const url = '/clean/cleanings/'
const maxChatLength = 6000;

const ChatSchema = yup.object({
	chatInputValue: yup.string()
		.defined()
		.max(maxChatLength, `The maximum number of characters is ${maxChatLength} for this demo`)
		.required('This field is required'),
});

interface ChatInputValues extends yup.InferType<typeof ChatSchema> {
	chatInputValue: string;
}

export const ChatInputForm: React.FC<{}> = () => {
	const initialValues: ChatInputValues = { chatInputValue: '' };
	const [cleanChatIn, setCleanChatIn] = useState<string>('');
	const [cleanChatOut, setCleanChatOut] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const fetchCleanChat = async (cleanChatIn: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response: AxiosResponse = await chatFetch.post(
				url,
				{
					"chat_text": cleanChatIn
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			// console.log('cleanChatOut reposponse', response.data.cleaned_chat);
			(response.data.result === "Not found")
				? setCleanChatOut('No chat found\n')
				: setCleanChatOut(response.data.cleaned_chat);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="card">
			<Formik
				initialValues={initialValues}
				validationSchema={ChatSchema}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					setCleanChatIn(values.chatInputValue);
					fetchCleanChat(cleanChatIn);
				}}
				onReset={(values, actions) => {
					console.log({ values, actions });
					setCleanChatOut('');
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<div className="input-container">
							<label htmlFor="chatInputText">Paste your chat here</label>
							<Field id="chatInputText" name="chatInputValue" placeholder="" as="textarea" rows={20} cols={40} />
							{errors.chatInputValue && touched.chatInputValue ? (
								<div className="input-error">{errors.chatInputValue}</div>
							) : null}
							<div className="button-group">
								<button type="submit">Submit</button>
								<button type="reset">Reset</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			{isLoading && <p>Loading...</p>}
			<div className="results_card">
				{(cleanChatOut !== '') && (cleanChatOut.split('\n').map((line) => <p key={nanoid()}>{line}</p>))
				}
			</div>
		</div>
	);
};
