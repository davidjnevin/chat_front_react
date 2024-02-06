import { render, screen } from '@testing-library/react';
import { ChatInputForm } from '../../components/ChatInputForm';

test('ChatInputForm renders correctly', () => {
render(<ChatInputForm />);
const chatInput = screen.getByLabelText('Paste your chat here');
expect(chatInput).toBeInTheDocument();
});
