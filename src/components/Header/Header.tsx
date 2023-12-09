import { Link } from 'react-router-dom';
import { isAuthorized } from '../../firebase';
import { logoutUser } from '../../services/auth';

export const Header: React.FC = () => {
  console.log(isAuthorized);
  return (
    <>
      {isAuthorized ? (
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
