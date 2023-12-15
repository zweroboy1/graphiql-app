import { useLocalization } from '../../cantexts/locale.context';

export const Home: React.FC = () => {
  const { translations } = useLocalization();

  return <div>{translations.Home}</div>;
};
