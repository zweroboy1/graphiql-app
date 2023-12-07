import App from './App';
import { render, screen } from '@testing-library/react';

describe('App Component', () => {
  it('renders the component with the correct message', () => {
    render(<App />);

    const messageElement = screen.getByText(
      /Click on the Vite and React logos to learn more/i
    );
    expect(messageElement).toBeInTheDocument();
  });
});
