import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../services/auth';
import { RootState } from '../../store/store';
import { useLocalization } from '../../contexts/locale.context';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const { language, setLanguage } = useLocalization();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
  };

  return (
    <>
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ru">Russian</option>
      </select>

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
