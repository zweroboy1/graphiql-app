import { Link } from 'react-router-dom';
import { isAuthorized } from '../../utils/consts';

export const Header: React.FC = () => {
  return (
    <>
      {isAuthorized ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/graph-ql">Graph Ql</Link>
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
