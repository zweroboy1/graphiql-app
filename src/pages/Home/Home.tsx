import React from 'react';
import { useLocalization } from '../../contexts/locale.context';

export const Home: React.FC = () => {
  const { translations } = useLocalization();

  return <div>{translations.Home}</div>;
};
