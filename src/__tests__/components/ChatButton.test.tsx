import React from 'react';
import { render, screen } from '@testing-library/react';
import {ChatButton} from '../../components/ChatButton';

test('renders button', () => {
	render(<ChatButton text="Press me!" action={() => alert('You pressed "Press me!"')} />);
	const buttonElement = screen.getByText(/Press me/i , {selector: 'button'});
	expect(buttonElement).toBeInTheDocument();
})
