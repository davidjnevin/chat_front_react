import React from 'react';
import { render, screen } from '@testing-library/react';
import {Description} from '../../components/Description';

test('renders description', () => {
	render(<Description />);
	const descriptionElement = screen.getByText(/welcome to Chat Cleaner/i);
	expect(descriptionElement).toBeInTheDocument();
})
