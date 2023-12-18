import { Documentation } from '../../components/Documentation/Documentation';
import { QueryEditor } from '../../components/Editor/QueryEditor';

export const GraphQl: React.FC = () => {
  return (
    <>
      <Documentation />
      <QueryEditor mode="editor" />
    </>
  );
};
