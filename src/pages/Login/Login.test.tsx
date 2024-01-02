import { MemoryRouter } from 'react-router';
import { Login } from './Login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as AuthServise from '../../services/auth';

vi.mock('../../services/auth');

const loginUserMock = AuthServise.loginUser;

describe('Login Page:', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    emailInput = screen.getByLabelText('Email');
    passwordInput = screen.getByLabelText('Password');
    submitButton = screen.getByRole('submit');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.skip('should has input for email', () => {
    expect(emailInput).toBeInTheDocument();
  });

  it.skip('should has input for password', () => {
    expect(passwordInput).toBeInTheDocument();
  });

  it.skip('should has button for submit form', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it.skip('should has required inputs', async () => {
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText('email is required');
      const passwordError = screen.getByText('password is required');

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test.skip('should has errors for invalid email and password: ', async () => {
    fireEvent.change(emailInput, { target: { value: 'testEmail' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    await waitFor(() => {
      const emailError = screen.getByText('email must be a valid email');
      const passwordError = screen.getByText(
        'password must have a special character'
      );
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test.skip('valid inputs:', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testP1!test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledOnce();
    });
  });
});
