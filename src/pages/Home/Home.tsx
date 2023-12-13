import React from 'react';
import { useLocalization } from '../../contexts/locale.context';

export const Home: React.FC = () => {
  const { t } = useLocalization();

  return <div>{t.Home}</div>;
};
