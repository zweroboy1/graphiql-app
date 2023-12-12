import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../services/auth';
import { RootState } from '../../store/store';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <>
      {user ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/graph-ql">Graph Ql</Link>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </>
  );
};
