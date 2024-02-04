import { render, screen } from '@testing-library/react';
import {Heading} from '../../components/Heading';

test('renders heading', () => {
	render(<Heading />);
	const headingElement = screen.getByText(/Chat Cleaner/i);
	expect(headingElement).toBeInTheDocument();
})
