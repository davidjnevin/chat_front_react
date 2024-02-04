import { render, screen } from '@testing-library/react';
import ChatInputTextArea from '../../components/ChatInputTextArea';

test('ChatInputTextArea renders correctly', () => {
render(<ChatInputTextArea />);
const chatInput = screen.getByLabelText('Paste your chat here');
expect(chatInput).toBeInTheDocument();
});
