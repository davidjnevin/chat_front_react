import { render, screen } from '@testing-library/react';
import GetAllIds from '../../components/GetAllIds';

test('GetAllIds renders correctly', () => {
render(<GetAllIds />);
const headingText = screen.getByText('No cleanings found');
expect(headingText).toBeInTheDocument();
});
