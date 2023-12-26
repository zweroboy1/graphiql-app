import React from 'react';
import { LANGUAGES } from '../../constants';
import { useLocalization } from '../../contexts/locale.context';

const LanguageButton: React.FC = () => {
  const { language, setLanguage } = useLocalization();

  const currentLanguage = LANGUAGES.filter((el) => el.code === language)[0];

  const toggleLanguage = () => {
    const nextLanguageId = (currentLanguage.id + 1) % LANGUAGES.length;
    const nextLanguage = LANGUAGES.filter((el) => el.id === nextLanguageId)[0];
    setLanguage(nextLanguage.code);
  };

  return (
    <div className="language">
      <button
        className="language__button"
        onClick={toggleLanguage}
        title="Change language"
      >
        <span className="big-screen">{currentLanguage.label}</span>
        <span className="small-screen">{currentLanguage.abbr}</span>
      </button>
    </div>
  );
};

export { LanguageButton };
