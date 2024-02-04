import React, { useState } from "react";
import { nanoid } from 'nanoid';

const ChatInputForm = () => {
	const formId = nanoid();
	const [chatValue, setChatValue] = useState('');
	const chatInputTextAreaId = nanoid();
	const [characterLimit] = useState(2000);

	const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Form submitted!");
	};

	const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setChatValue('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setChatValue(e.target.value);
	};

	return (

		<div className="card">
			<form
				onSubmit={handleFormSubmission}
				onReset={handleFormReset}
				id={formId}
			>
				<div className="input-container">
					<textarea
						id={chatInputTextAreaId}
						name="chat_input"
						placeholder=""
						value={chatValue}
						onChange={handleChange}
						rows={20}
						cols={40}
						minLength={1}
						maxLength={characterLimit}
					/>
					<label className={chatValue && 'filled'} htmlFor={chatInputTextAreaId}>Paste your chat here</label>
				</div>

				<button id={nanoid()} disabled={false} type="submit">
					Submit
				</button>
				<button id={nanoid()} disabled={false} type="reset">
					Reset
				</button>
			</form>
		</div>
	)
};

export default ChatInputForm;
