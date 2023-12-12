import { Router } from '../../router/router';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../store/slices/userSlice';

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
