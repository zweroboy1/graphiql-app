import { MemoryRouter } from 'react-router';
import { Login } from './Login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as AuthService from '../../services/auth';
import { LanguageProvider } from '../../contexts/locale.context';

vi.mock('../../services/auth');

const loginUserMock = AuthService.loginUser;

describe('Login Page:', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Login />
        </LanguageProvider>
      </MemoryRouter>
    );
    emailInput = screen.getByRole('email');
    passwordInput = screen.getByRole('password');
    submitButton = screen.getByRole('submit');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should has input for email', () => {
    expect(emailInput).toBeInTheDocument();
  });

  it('should has input for password', () => {
    expect(passwordInput).toBeInTheDocument();
  });

  it('should has button for submit form', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it('should has errors for invalid email and password: ', async () => {
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

  it('should login with valid inputs', async () => {
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testP1!test' } });
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledOnce();
    });
  });
});
