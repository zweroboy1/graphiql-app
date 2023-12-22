import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../services/auth';
import { RootState } from '../../store/store';
import { LanguageButton } from '../LanguageButton/LanguageButton';

import UserSvg from '../../assets/svg/user.svg';
import Logo from '../../assets/svg/logo.svg';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" title="Welcome page">
          <div className="header__logo-container">
            <Logo className="header__logo-image" />
            <span className="header__logo-text">GraphQL app</span>
          </div>
        </Link>
        {user && (
          <Link
            className="button button_medium button_image button_image-playground"
            to="/graph-ql"
            title="GraphQL playground"
          >
            Playground
          </Link>
        )}
      </div>
      <LanguageButton />
      {user ? (
        <div className="header__right">
          <div
            className="header__user-container"
            title={`Your Profile (${user.name})`}
          >
            <UserSvg className="header__user-image" />
          </div>
          <Link
            className="button button_medium button_image button_image-logout"
            to="/"
            onClick={logoutUser}
            title="Logout"
            aria-label="Logout"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="header__right">
          <Link
            className="button button_medium button_image button_image-login"
            to="/login"
            title="Login"
            aria-label="Login"
          >
            Sign In
          </Link>
          <Link
            className="button button_medium button_image button_image-register"
            to="/register"
            title="Register"
            aria-label="Register"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};
