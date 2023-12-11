import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../services/auth';
import { RootState } from '../../store/store';

import Logo from '../../assets/svg/logo.svg';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <header className="header">
      <>
        <Link to="/">
          <div className="header__logo-container">
            <Logo className="header__logo-image" />
            <span className="header__logo-text">GraphQl app</span>
          </div>
        </Link>
        {user ? (
          <div className="header__right">
            <Link className="button button_medium" to="/graph-ql">
              Graph Ql
            </Link>
            <Link className="button button_medium" to="/" onClick={logoutUser}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="header__right">
            <Link className="button button_medium" to="/login">
              Sign In
            </Link>
            <Link className="button button_medium" to="/register">
              Sign Up
            </Link>
          </div>
        )}
      </>
    </header>
  );
};
