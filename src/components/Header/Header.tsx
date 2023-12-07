import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <Link to="/login" >Sign In</Link>
      <Link to="/register">Sign Up</Link>
      <Link to="/">Home</Link>
    </>
  );
};
