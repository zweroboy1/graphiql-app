import { Documentation } from '../../components/Documentation/Documentation';
// import { QueryEditor } from '../../components/Editor/QueryEditor';
import { QueryEditorTextarea } from '../../components/Editor/QueryEditorTextarea';

export const GraphQl: React.FC = () => {
  return (
    <>
      <Documentation />
      {/* <QueryEditor /> */}
      <QueryEditorTextarea />
    </>
  );
};
