import React, { useState } from 'react';
import { LANGUAGES } from '../../constants';
import { useLocalization } from '../../contexts/locale.context';

const LanguageButton: React.FC = () => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  const { setLanguage } = useLocalization();

  const toggleLanguage = () => {
    setCurrentLanguageIndex((currentLanguageIndex + 1) % LANGUAGES.length);
    setLanguage(LANGUAGES[currentLanguageIndex].code);
  };

  return (
    <div className="language">
      <button className="language__button" onClick={toggleLanguage}>
        {LANGUAGES[currentLanguageIndex].label}
      </button>
    </div>
  );
};

export { LanguageButton };
