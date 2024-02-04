import { render, screen } from '@testing-library/react';
import InputField from '../../components/InputField';

test('Input component should render correctly', () => {
	render(<InputField name="first_name" label="first_name" />);
	const inputField = screen.getByLabelText('first_name');
	expect(inputField).toBeInTheDocument();
});

