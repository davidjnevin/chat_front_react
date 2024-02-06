import * as yup from 'yup';
import { Formik, Form, Field, } from 'formik';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';


const url = 'http://127.0.0.1:8000/clean/cleanings/'
const maxChatLength = 1000;

const ChatSchema = yup.object({
	chatInputValue: yup.string()
		.defined()
		.max(maxChatLength, 'The maximum number of characters is {maxChatLength} for this demo')
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
		console.log('cleanChatIn', cleanChatIn);
		setIsLoading(true);
		setError(null);

		try {
			const response: AxiosResponse = await axios.post(
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
			(response.data.result === "Not found")
				? setCleanChatOut('No chat found\n')
				: console.log(response);
			// : setCleanChatOut(response.data.result.cleaned_chat);
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
		</div>
	);
};
