import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home Component', () => {
  it.skip('renders the component with the correct message', () => {
    render(<Home />);

    const messageElement = screen.getByText(/Home/i);
    expect(messageElement).toBeInTheDocument();
  });
});
