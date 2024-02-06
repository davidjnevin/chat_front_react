import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders heading', () => {
	render(<App />);
	const linkElement = screen.getByText(/Chat Cleaner/i, { selector: 'h1' });
	expect(linkElement).toBeInTheDocument();
});

test('renders description', () => {
	render(<App />);
	const descriptionElement = screen.getByText(/Welcome to Chat Cleaner/i, { selector: 'p' });
	expect(descriptionElement).toBeInTheDocument();
});


test('renders ChatInputForm', () => {
	render(<App />);
	const chatInput = screen.getByLabelText(/Paste your chat here/i, { selector: 'textarea' });
	const submitButtonElement = screen.getByText(/Submit/i, { selector: 'button' });
	const resetButtonElement = screen.getByText(/Reset/i, { selector: 'button' });
	expect(chatInput).toBeInTheDocument();
	expect(submitButtonElement).toBeInTheDocument();
	expect(resetButtonElement).toBeInTheDocument();
});
