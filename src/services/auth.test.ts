import * as FirebaseAuth from '@firebase/auth';
2;

import { Mock } from 'vitest';
import { waitFor } from '@testing-library/react';

vi.mock('@firebase/auth');
vi.mock('firebase/firestore');

import { registerUser, loginUser, logoutUser } from './auth';

const signInWithEmailAndPasswordMock = (
  FirebaseAuth.signInWithEmailAndPassword as Mock
).mockReturnValue(Promise.resolve());
const signOutMock = (FirebaseAuth.signOut as Mock).mockReturnValue(
  Promise.resolve()
);
const updateProfileMock = FirebaseAuth.updateProfile;
const createUserWithEmailAndPasswordMock = (
  FirebaseAuth.createUserWithEmailAndPassword as Mock
).mockReturnValue({ user: {} });

describe('Auth Service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should registerUser work', async () => {
    registerUser({
      name: 'name',
      password: 'password',
      email: 'email@example.com',
    });

    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledOnce();

    await waitFor(() => {
      expect(updateProfileMock).toHaveBeenCalledOnce();
    });
  });

  it('should loginUser work', async () => {
    loginUser({
      password: 'password',
      email: 'email@example.com',
    });

    await waitFor(() => {
      expect(signInWithEmailAndPasswordMock).toHaveBeenCalledOnce();
    });
  });

  it('should logoutUser work', async () => {
    logoutUser();

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledOnce();
    });
  });
});
