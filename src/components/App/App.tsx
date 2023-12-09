import { Router } from '../../router/router';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../store/slices/useSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    dispatch(updateUser(user));
  });

  return <Router />;
};
