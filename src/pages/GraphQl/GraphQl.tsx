import { useEffect } from 'react';
import { fetchGraphQlSchema } from '../../utils/api';
import { RootObject } from '../../types/types';
import { useDispatch } from 'react-redux';
import { setSchema } from '../../store/slices/schemaSlice';
import { Documentation } from '../../components/Documentation/Documentation';

export const GraphQl: React.FC = () => {
  // const [schema, setSchemaa] = useState<Field[]>([]);
  // const [selectedField, setSelectedField] = useState<Field | null>(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const { data } = (await fetchGraphQlSchema()) as RootObject;
    // const rootQuery = data.__schema.types.find((elem) => elem.name === 'Query');
    // setSchema(rootQuery?.fields ? rootQuery?.fields : []);
    dispatch(setSchema(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleFieldClick = (field: Field) => {
  //   setSelectedField(field);
  // };
  return (
    <>
      <Documentation />
    </>
  );
};
