import '@testing-library/jest-dom';

vi.mock('@firebase/auth', () => ({
  getAuth: () => ({
    onAuthStateChanged: (func: () => void) => {
      func();
      return () => {};
    },
  }),
}));
