import * as yup from 'yup';
import { Formik, Form, Field, } from 'formik';


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
	return (
		<div className="card">
			<Formik
				initialValues={initialValues}
				validationSchema={ChatSchema}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
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
