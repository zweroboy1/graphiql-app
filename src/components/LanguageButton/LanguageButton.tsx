import React, { useState } from 'react';
import { LANGUAGES } from '../../constants';

const LanguageButton: React.FC = () => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);

  const toggleLanguage = () => {
    setCurrentLanguageIndex((currentLanguageIndex + 1) % LANGUAGES.length);
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
