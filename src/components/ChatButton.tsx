import React from 'react';
import { nanoid } from 'nanoid';

interface ChatButtonProps {
	text: string;
	formId: string;
	disabled?: boolean;
	type?: "submit" | "reset";
}

export const ChatButton: React.FC<ChatButtonProps> = ({ text, disabled = false, type="submit" }) => {
	return (
		<button id={nanoid()}  disabled={disabled} type={type}>
			{text}
		</button>
	);
};
