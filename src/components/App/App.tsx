import { Router } from '../../router/router';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../store/slices/userSlice';

/*
export const App: React.FC = () => {
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        updateUser({
          name: user.displayName as string,
          email: user.email as string,
        })
      );
    } else {
      dispatch(updateUser(null));
    }
  });

  return <Router />;
};
*/

import { useState, useEffect } from 'react';
export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName && user.email) {
        dispatch(
          updateUser({
            name: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(updateUser(null));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return null; //<div>loader</div>;
  }

  return <Router />;
};
