import { useState, createContext } from 'react';
import { Router } from '../../router/router';
import { auth } from '../../firebase';
import { User } from '@firebase/auth';

export const UserContext = createContext<User | null>(null);

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <UserContext.Provider value={user}>
      <Router />
    </UserContext.Provider>
  );
};
