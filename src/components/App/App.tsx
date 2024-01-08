import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Router } from '../../router/router';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/slices/userSlice';
import { Loader } from '../Loader/Loader';
import { useLocalization } from '../../contexts/locale.context';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { translationsLoaded } = useLocalization();

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
  }, [dispatch, location]);

  if (loading || !translationsLoaded) {
    return (
      <main className="main">
        <section className="wrapper wrapper_loader">
          <Loader />
        </section>
      </main>
    );
  }

  return <Router />;
};
