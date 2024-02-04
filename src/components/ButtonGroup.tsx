import { ChatButton } from './ChatButton';


interface ButtonGroupProps {
	formId: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({formId}) => {

	return (
		<div className="button-group">
				<ChatButton text="Submit" formId={formId}/>
				<ChatButton text="Reset" type='reset' formId={formId}/>
		</div>
	);
}
