import { useLocalization } from '../../cantexts/locale.context';

export const Home: React.FC = () => {
  // const [schema, setSchema] = useState('');

  // useEffect(() => {
  //   fetchGraphQlSchema();
  // }, [fetchGraphQlSchema]);

  const { translations } = useLocalization();

  return (
    <div>
      {translations.Home}
      {/* <div>{schema}</div> */}
    </div>
  );
};
