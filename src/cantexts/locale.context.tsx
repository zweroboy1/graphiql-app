import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  translations: Record<string, string>;
};

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>('en');

  const translationsPromise = import(`../locales/${language}.json`);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  translationsPromise.then((module) => {
    setTranslations(module.default || {});
  });

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLocalization must be used within a LanguageProvider');
  }

  return context;
};
