import React, { useState } from 'react';
import { nanoid } from 'nanoid';

interface ChatInputTextAreaProps {
	name?: string;
	label?: string;
	placeholder?: string;
	rows_?: number;
	cols_?: number;
}


const ChatInputTextArea: React.FC<ChatInputTextAreaProps> = ({ name = "chat_input", label = "Paste your chat here", placeholder = "", rows_ = 20, cols_ = 40 }) => {
	const chatInputTextAreaId = nanoid();
	const [characterLimit] = useState(30);
	const [value, setValue] = useState('');

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setValue(e.target.value);
	}
	return (
		<div className="input-container">
			<textarea
				id={chatInputTextAreaId}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				rows={rows_}
				cols={cols_}
			/>
			<label className={value && 'filled'} htmlFor={chatInputTextAreaId}>{label}</label>
		</div>
	);
}

export default ChatInputTextArea;
