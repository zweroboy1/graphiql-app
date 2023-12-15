import { useLocalization } from '../../cantexts/locale.context';

export const Home: React.FC = () => {
  const { t } = useLocalization();

  return <div>{t.Home}</div>;
};
