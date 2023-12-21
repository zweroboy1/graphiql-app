import { ApiEndpointBtn } from '../../components/ApiEndpointBtn/ApiEndpointBtn';
import { Documentation } from '../../components/Documentation/Documentation';
import { QueryEditor } from '../../components/Editor/QueryEditor';

export const GraphQl: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Documentation />
      <ApiEndpointBtn />
      <QueryEditor mode="editor" />
    </div>
  );
};
