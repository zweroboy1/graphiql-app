import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: Record<string, string>;
  translationsLoaded?: boolean;
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>('en');
  const [translationsLoaded, setTranslationsLoaded] = useState<boolean>(false);

  const translationsPromise = import(`../locales/${language}.json`);
  const [t, setTranslations] = useState<Record<string, string>>({});

  translationsPromise.then((module) => {
    setTranslations(module.default || {});
    setTranslationsLoaded(true);
  });

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    translationsLoaded,
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
