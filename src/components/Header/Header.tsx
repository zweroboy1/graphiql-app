import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../services/auth';
import { UserContext } from '../App/App';

export const Header: React.FC = () => {
  const user = useContext(UserContext);

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
