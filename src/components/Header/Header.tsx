import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocalization } from '../../contexts/locale.context';
import { logoutUser } from '../../services/auth';
import { RootState } from '../../store/store';
import { LanguageButton } from '../LanguageButton/LanguageButton';
import { COMPACT_HEADER_WHEN_SCROLL_Y } from '../../constants';

import UserSvg from '../../assets/svg/user.svg';
import Logo from '../../assets/svg/logo.svg';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [scrollPos, setScrollPos] = useState(0);
  const [headerStyle, setHeaderStyle] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const { t } = useLocalization();

  const debounce = (func: VoidFunction, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this), delay);
    };
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      const position = window.scrollY;
      setScrollPos(position);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let headerHeight = 0;
    if (headerRef.current) {
      headerHeight = headerRef.current.offsetHeight;
    }
    setHeaderStyle(
      scrollPos - headerHeight > COMPACT_HEADER_WHEN_SCROLL_Y
        ? 'header__wrapper-compact'
        : ''
    );
  }, [scrollPos]);

  return (
    <header className={`header`}>
      <div className={`header__wrapper ${headerStyle}`} ref={headerRef}>
        <div className="header__left">
          <Link to="/" title={t.WelcomePage}>
            <div className="header__logo-container">
              <Logo className="header__logo-image" />
              <span className="header__logo-text">GraphQL app</span>
            </div>
          </Link>
          {user && (
            <Link
              className="button button_medium button_image button_image-playground"
              to="/graph-ql"
              title={t.GraphQlPlayground}
            >
              {t.Playground}
            </Link>
          )}
        </div>
        <LanguageButton />
        {user ? (
          <div className="header__right">
            <div
              className="header__user-container"
              title={`${t.YourProfile} (${user.name})`}
            >
              <UserSvg className="header__user-image" />
            </div>
            <Link
              className="button button_medium button_image button_image-logout"
              to="/"
              onClick={logoutUser}
              title={t.Logout}
              aria-label={t.Logout}
            >
              {t.Logout}
            </Link>
          </div>
        ) : (
          <div className="header__right">
            <Link
              className="button button_medium button_image button_image-login"
              to="/login"
              title={t.Login}
              aria-label={t.Login}
            >
              {t.SignIn}
            </Link>
            <Link
              className="button button_medium button_image button_image-register"
              to="/register"
              title={t.Register}
              aria-label={t.Register}
            >
              {t.SignUp}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
